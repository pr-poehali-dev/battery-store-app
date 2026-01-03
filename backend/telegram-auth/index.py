"""
API для авторизации через Telegram-бота.
Отправляет код подтверждения в Telegram и проверяет его.
"""
import json
import os
import random
import time
import requests

# Хранилище кодов в памяти (в продакшене использовать Redis или БД)
codes_storage = {}

def handler(event: dict, context) -> dict:
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        action = body.get('action')
        
        if action == 'send':
            return send_telegram_code(body)
        elif action == 'verify':
            return verify_telegram_code(body)
        else:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Invalid action'})
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }


def send_telegram_code(body: dict) -> dict:
    """Отправляет код подтверждения в Telegram"""
    telegram_id = body.get('telegram_id')
    
    if not telegram_id:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'telegram_id is required'})
        }
    
    # Генерируем 4-значный код
    code = str(random.randint(1000, 9999))
    
    # Сохраняем код с timestamp (5 минут действия)
    codes_storage[telegram_id] = {
        'code': code,
        'timestamp': time.time()
    }
    
    # Отправляем код в Telegram
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    
    if not bot_token:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'TELEGRAM_BOT_TOKEN not configured'})
        }
    
    message = f"🔐 Ваш код для входа в приложение:\n\n*{code}*\n\nКод действителен 5 минут."
    
    try:
        response = requests.post(
            f'https://api.telegram.org/bot{bot_token}/sendMessage',
            json={
                'chat_id': telegram_id,
                'text': message,
                'parse_mode': 'Markdown'
            },
            timeout=10
        )
        
        result = response.json()
        
        if not result.get('ok'):
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Failed to send Telegram message', 'details': result})
            }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Code sent to Telegram'
            })
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Telegram API error: {str(e)}'})
        }


def verify_telegram_code(body: dict) -> dict:
    """Проверяет код подтверждения"""
    telegram_id = body.get('telegram_id')
    code = body.get('code')
    
    if not telegram_id or not code:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'telegram_id and code are required'})
        }
    
    stored = codes_storage.get(telegram_id)
    
    if not stored:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Code not found or expired'})
        }
    
    # Проверяем время (5 минут = 300 секунд)
    if time.time() - stored['timestamp'] > 300:
        del codes_storage[telegram_id]
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Code expired'})
        }
    
    # Проверяем код
    if stored['code'] != code:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid code'})
        }
    
    # Удаляем использованный код
    del codes_storage[telegram_id]
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'success': True,
            'telegram_id': telegram_id
        })
    }
