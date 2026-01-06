import json
import os
import psycopg2
from decimal import Decimal

def handler(event: dict, context) -> dict:
    '''API для начисления кэшбека клиентам при покупке'''
    
    method = event.get('httpMethod', 'POST')
    
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
        body = json.loads(event.get('body', '{}'))
        user_id = body.get('userId')
        cashback_amount = body.get('cashbackAmount')
        
        if not user_id or not cashback_amount:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'userId and cashbackAmount are required'}),
                'isBase64Encoded': False
            }
        
        cashback_decimal = Decimal(str(cashback_amount))
        
        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        
        # Проверяем существует ли клиент
        cur.execute(
            "SELECT id, cashback FROM t_p87786830_battery_store_app.customers WHERE phone = %s OR id::text = %s",
            (user_id, user_id)
        )
        customer = cur.fetchone()
        
        if not customer:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Customer not found'}),
                'isBase64Encoded': False
            }
        
        customer_id = customer[0]
        current_cashback = customer[1] or Decimal('0')
        new_cashback = current_cashback + cashback_decimal
        
        # Начисляем кэшбек
        cur.execute(
            "UPDATE t_p87786830_battery_store_app.customers SET cashback = %s, updated_at = NOW() WHERE id = %s",
            (str(new_cashback), customer_id)
        )
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'customerId': customer_id,
                'cashbackAdded': str(cashback_decimal),
                'newBalance': str(new_cashback)
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
