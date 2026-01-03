import json
import os
import random
import urllib.request
import urllib.parse
from datetime import datetime, timedelta

# Хранилище кодов в памяти (в продакшене использовать Redis или БД)
codes_storage = {}

def handler(event: dict, context) -> dict:
    """
    API для отправки SMS с кодом подтверждения
    """
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }

    try:
        body = json.loads(event.get('body', '{}'))
        phone = body.get('phone', '').strip()

        if not phone or len(phone) < 10:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Некорректный номер телефона'})
            }

        # Генерируем 4-значный код
        code = str(random.randint(1000, 9999))
        
        # Сохраняем код с временем истечения (5 минут)
        codes_storage[phone] = {
            'code': code,
            'expires': (datetime.now() + timedelta(minutes=5)).isoformat()
        }

        # Отправка SMS
        sms_api_key = os.environ.get('SMS_API_KEY')
        
        if not sms_api_key:
            # Режим разработки - возвращаем код в ответе
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'message': 'Код отправлен (режим разработки)',
                    'dev_code': code  # Только для разработки!
                })
            }

        # Отправка через SMSC.ru
        # Формат API ключа: "login:password"
        if ':' in sms_api_key:
            login, password = sms_api_key.split(':', 1)
        else:
            login = sms_api_key
            password = ''

        message = f'Ваш код подтверждения: {code}\nМир Аккумуляторов'
        
        params = {
            'login': login,
            'psw': password,
            'phones': phone,
            'mes': message,
            'fmt': '3'  # JSON ответ
        }

        url = 'https://smsc.ru/sys/send.php?' + urllib.parse.urlencode(params)
        
        try:
            with urllib.request.urlopen(url, timeout=10) as response:
                result = json.loads(response.read().decode('utf-8'))
                
                if 'error' in result:
                    return {
                        'statusCode': 500,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': f'Ошибка отправки SMS: {result.get("error_code")}'})
                    }

            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'message': 'Код отправлен на ваш номер'
                })
            }
        except Exception as sms_error:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': f'Ошибка SMS-сервиса: {str(sms_error)}'})
            }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Внутренняя ошибка: {str(e)}'})
        }
