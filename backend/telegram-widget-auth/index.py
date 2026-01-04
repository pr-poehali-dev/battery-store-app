"""
API для проверки авторизации через Telegram Login Widget.
Проверяет подпись данных от Telegram и возвращает данные пользователя.
"""
import json
import hashlib
import hmac
import time
import os


def handler(event: dict, context) -> dict:
    """Проверяет данные авторизации от Telegram Login Widget"""
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body_str = event.get('body', '{}')
        if not body_str or body_str.strip() == '':
            body_str = '{}'
        body = json.loads(body_str)
        
        # Получаем токен бота из секретов
        bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        if not bot_token:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'TELEGRAM_BOT_TOKEN not configured'}),
                'isBase64Encoded': False
            }
        
        # Проверяем подпись от Telegram
        is_valid = verify_telegram_auth(body, bot_token)
        
        if not is_valid:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Invalid Telegram authentication data'}),
                'isBase64Encoded': False
            }
        
        # Возвращаем данные пользователя
        user_data = {
            'id': body.get('id'),
            'first_name': body.get('first_name'),
            'last_name': body.get('last_name', ''),
            'username': body.get('username', ''),
            'photo_url': body.get('photo_url', ''),
            'auth_date': body.get('auth_date')
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'user': user_data
            }),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }


def verify_telegram_auth(auth_data: dict, bot_token: str) -> bool:
    """
    Проверяет подпись авторизации от Telegram Login Widget.
    Документация: https://core.telegram.org/widgets/login#checking-authorization
    """
    check_hash = auth_data.get('hash')
    if not check_hash:
        return False
    
    # Создаем копию данных без hash
    data_check = {k: v for k, v in auth_data.items() if k != 'hash'}
    
    # Сортируем и создаем строку для проверки
    data_check_string = '\n'.join([f'{k}={v}' for k, v in sorted(data_check.items())])
    
    # Создаем secret key из токена бота
    secret_key = hashlib.sha256(bot_token.encode()).digest()
    
    # Вычисляем hash
    calculated_hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()
    
    # Проверяем совпадение hash
    if calculated_hash != check_hash:
        return False
    
    # Проверяем время (не старше 24 часов)
    auth_date = int(auth_data.get('auth_date', 0))
    if time.time() - auth_date > 86400:
        return False
    
    return True