import json
import os
import requests
import psycopg2

YANDEX_CLIENT_ID = os.environ.get('YANDEX_CLIENT_ID', '')
YANDEX_CLIENT_SECRET = os.environ.get('YANDEX_CLIENT_SECRET', '')


def get_db_connection():
    """Подключение к базе данных"""
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        raise Exception('DATABASE_URL not configured')
    return psycopg2.connect(dsn)


def get_yandex_token(code: str) -> dict:
    """Обмен кода на токен доступа"""
    token_url = 'https://oauth.yandex.ru/token'
    
    data = {
        'grant_type': 'authorization_code',
        'code': code,
        'client_id': YANDEX_CLIENT_ID,
        'client_secret': YANDEX_CLIENT_SECRET
    }
    
    response = requests.post(token_url, data=data)
    return response.json()


def get_yandex_user_info(access_token: str) -> dict:
    """Получение информации о пользователе"""
    info_url = 'https://login.yandex.ru/info'
    headers = {'Authorization': f'OAuth {access_token}'}
    
    response = requests.get(info_url, headers=headers)
    return response.json()


def register_or_login_user(yandex_data: dict) -> dict:
    """Регистрация или вход пользователя через Яндекс"""
    yandex_id = yandex_data.get('id')
    display_name = yandex_data.get('display_name', 'Клиент')
    email = yandex_data.get('default_email', '')
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        cur.execute("""
            SELECT id, name, phone, cashback, role, created_at
            FROM t_p87786830_battery_store_app.users
            WHERE yandex_id = %s
        """, (str(yandex_id),))
        
        user = cur.fetchone()
        
        if user:
            cur.execute("""
                UPDATE t_p87786830_battery_store_app.users 
                SET name = %s, email = %s, last_login = NOW()
                WHERE yandex_id = %s
                RETURNING id, name, phone, cashback, role
            """, (display_name, email, str(yandex_id)))
            
            updated_user = cur.fetchone()
            conn.commit()
            
            return {
                'id': updated_user[0],
                'name': updated_user[1],
                'phone': updated_user[2] or '',
                'cashback': float(updated_user[3]) if updated_user[3] else 0.0,
                'role': updated_user[4],
                'yandex_id': yandex_id,
                'is_new': False
            }
        else:
            cur.execute("""
                INSERT INTO t_p87786830_battery_store_app.users (yandex_id, name, email, phone, role, cashback, created_at, last_login)
                VALUES (%s, %s, %s, '', 'client', 0, NOW(), NOW())
                RETURNING id, name, phone, cashback, role
            """, (str(yandex_id), display_name, email))
            
            new_user = cur.fetchone()
            conn.commit()
            
            return {
                'id': new_user[0],
                'name': new_user[1],
                'phone': new_user[2] or '',
                'cashback': float(new_user[3]) if new_user[3] else 0.0,
                'role': new_user[4],
                'yandex_id': yandex_id,
                'is_new': True
            }
    
    finally:
        cur.close()
        conn.close()


def handler(event: dict, context) -> dict:
    """Обработчик OAuth авторизации через Яндекс"""
    
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': ''
        }
    
    try:
        raw_body = event.get('body', '{}')
        body = json.loads(raw_body) if isinstance(raw_body, str) else raw_body
        code = body.get('code') if isinstance(body, dict) else None
        
        if not code:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Authorization code is required'})
            }
        
        print(f"[YANDEX OAUTH] Received code: {code[:20]}...")
        
        token_data = get_yandex_token(code)
        print(f"[YANDEX OAUTH] Token data: {json.dumps(token_data, ensure_ascii=False)}")
        
        if 'access_token' not in token_data:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': token_data.get('error_description', 'Failed to get access token')})
            }
        
        user_info = get_yandex_user_info(token_data['access_token'])
        print(f"[YANDEX OAUTH] User info: {json.dumps(user_info, ensure_ascii=False)}")
        
        user_data = register_or_login_user(user_info)
        print(f"[YANDEX OAUTH] User data: {json.dumps(user_data, ensure_ascii=False, default=str)}")
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'user': user_data,
                'message': 'Регистрация успешна!' if user_data['is_new'] else 'Вход выполнен!'
            })
        }
    
    except Exception as e:
        print(f"[YANDEX OAUTH] ❌ Exception: {str(e)}")
        import traceback
        print(f"[YANDEX OAUTH] Traceback: {traceback.format_exc()}")
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }