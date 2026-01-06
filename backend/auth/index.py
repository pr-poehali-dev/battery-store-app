import json
import os
import psycopg2
from datetime import datetime

def handler(event: dict, context) -> dict:
    '''API для регистрации и авторизации клиентов магазина'''
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
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }

    try:
        body = json.loads(event.get('body', '{}'))
        name = body.get('name', '').strip()
        phone = body.get('phone', '').strip()

        if not phone or len(phone) < 10:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Некорректный номер телефона'}),
                'isBase64Encoded': False
            }

        if not name:
            name = 'Клиент'

        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cursor = conn.cursor()

        cursor.execute(
            "SELECT id, name, phone, cashback, created_at FROM t_p87786830_battery_store_app.customers WHERE phone = %s",
            (phone,)
        )
        existing = cursor.fetchone()

        if existing:
            customer = {
                'id': existing[0],
                'name': existing[1],
                'phone': existing[2],
                'cashback': float(existing[3]),
                'created_at': existing[4].isoformat()
            }
        else:
            cursor.execute(
                "INSERT INTO t_p87786830_battery_store_app.customers (name, phone, cashback) VALUES (%s, %s, 0) RETURNING id, name, phone, cashback, created_at",
                (name, phone)
            )
            new_customer = cursor.fetchone()
            conn.commit()
            
            customer = {
                'id': new_customer[0],
                'name': new_customer[1],
                'phone': new_customer[2],
                'cashback': float(new_customer[3]),
                'created_at': new_customer[4].isoformat()
            }

        cursor.close()
        conn.close()

        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True, 'customer': customer}),
            'isBase64Encoded': False
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
