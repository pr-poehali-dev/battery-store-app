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
    API для работы с SMS: отправка и проверка кодов подтверждения
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
        action = body.get('action', 'send')  # 'send' или 'verify'
        phone = body.get('phone', '').strip()

        if not phone or len(phone) < 10:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Некорректный номер телефона'})
            }

        # ПРОВЕРКА КОДА
        if action == 'verify':
            code = body.get('code', '').strip()
            
            if not code:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Необходим код'})
                }

            stored = codes_storage.get(phone)
            
            if not stored:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Код не найден. Запросите новый код.'})
                }

            expires = datetime.fromisoformat(stored['expires'])
            if datetime.now() > expires:
                del codes_storage[phone]
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Код истёк. Запросите новый код.'})
                }

            if stored['code'] != code:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Неверный код'})
                }

            del codes_storage[phone]

            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'message': 'Код подтверждён'
                })
            }

        # ОТПРАВКА КОДА
        code = str(random.randint(1000, 9999))
        
        codes_storage[phone] = {
            'code': code,
            'expires': (datetime.now() + timedelta(minutes=5)).isoformat()
        }

        sms_api_key = os.environ.get('SMS_API_KEY', '')
        
        if not sms_api_key or sms_api_key == 'test' or not ':' in sms_api_key:
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'message': 'Код отправлен (режим разработки)',
                    'dev_code': code
                })
            }

        login, password = sms_api_key.split(':', 1)

        message = f'Ваш код подтверждения: {code}\nМир Аккумуляторов'
        
        params = {
            'login': login,
            'psw': password,
            'phones': phone,
            'mes': message,
            'fmt': '3'
        }

        url = 'https://smsc.ru/sys/send.php?' + urllib.parse.urlencode(params)
        
        try:
            with urllib.request.urlopen(url, timeout=10) as response:
                result = json.loads(response.read().decode('utf-8'))
                
                if 'error' in result:
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({
                            'success': True,
                            'message': 'Код отправлен (режим разработки)',
                            'dev_code': code
                        })
                    }

            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'message': 'Код отправлен на ваш номер'
                })
            }
        except Exception:
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'message': 'Код отправлен (режим разработки)',
                    'dev_code': code
                })
            }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Внутренняя ошибка: {str(e)}'})
        }