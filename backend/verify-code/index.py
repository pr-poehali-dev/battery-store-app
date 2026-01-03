import json
from datetime import datetime

# Хранилище кодов (должно быть общим с send-sms - в продакшене Redis/БД)
codes_storage = {}

def handler(event: dict, context) -> dict:
    """
    API для проверки кода подтверждения
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
        code = body.get('code', '').strip()

        if not phone or not code:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Необходимы телефон и код'})
            }

        # Проверяем код
        stored = codes_storage.get(phone)
        
        if not stored:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Код не найден. Запросите новый код.'})
            }

        # Проверяем срок действия
        expires = datetime.fromisoformat(stored['expires'])
        if datetime.now() > expires:
            del codes_storage[phone]
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Код истёк. Запросите новый код.'})
            }

        # Проверяем совпадение кода
        if stored['code'] != code:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Неверный код'})
            }

        # Код верный - удаляем из хранилища
        del codes_storage[phone]

        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'message': 'Код подтверждён'
            })
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Внутренняя ошибка: {str(e)}'})
        }
