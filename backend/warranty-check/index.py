import json
import os
import psycopg2
from datetime import datetime, timedelta

def handler(event: dict, context) -> dict:
    '''Проверка гарантии аккумулятора по серийному номеру'''
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
        body = json.loads(event.get('body', '{}'))
        serial_number = body.get('serial_number', '').strip().upper()
        
        if not serial_number:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Серийный номер не указан'}),
                'isBase64Encoded': False
            }
        
        # Подключение к БД
        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cursor = conn.cursor()
        
        # Поиск аккумулятора по серийному номеру
        query = """
            SELECT serial_number, brand, model, purchase_date, warranty_months, 
                   buyer_phone, buyer_name, store_address
            FROM warranty_checks 
            WHERE UPPER(serial_number) = %s
        """
        cursor.execute(query, (serial_number,))
        result = cursor.fetchone()
        
        cursor.close()
        conn.close()
        
        if not result:
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'found': False,
                    'message': 'Аккумулятор с таким серийным номером не найден в базе'
                }),
                'isBase64Encoded': False
            }
        
        # Расчет срока гарантии
        serial, brand, model, purchase_date, warranty_months, phone, name, store = result
        warranty_end = purchase_date + timedelta(days=warranty_months * 30)
        days_left = (warranty_end - datetime.now().date()).days
        is_valid = days_left > 0
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'found': True,
                'warranty': {
                    'serial_number': serial,
                    'brand': brand,
                    'model': model,
                    'purchase_date': purchase_date.isoformat(),
                    'warranty_months': warranty_months,
                    'warranty_end': warranty_end.isoformat(),
                    'days_left': days_left if is_valid else 0,
                    'is_valid': is_valid,
                    'buyer_phone': phone,
                    'buyer_name': name,
                    'store_address': store
                }
            }),
            'isBase64Encoded': False
        }
        
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Неверный формат данных'}),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Ошибка сервера: {str(e)}'}),
            'isBase64Encoded': False
        }
