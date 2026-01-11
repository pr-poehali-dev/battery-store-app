import json
import os
import hashlib
import hmac
import psycopg2
from datetime import datetime

TELEGRAM_BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN', '')


def verify_telegram_auth(auth_data: dict) -> bool:
    """Проверка подлинности данных от Telegram Widget"""
    check_hash = auth_data.pop('hash', None)
    if not check_hash:
        return False
    
    data_check_string = '\n'.join([f'{k}={v}' for k, v in sorted(auth_data.items())])
    secret_key = hashlib.sha256(TELEGRAM_BOT_TOKEN.encode()).digest()
    calculated_hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()
    
    return calculated_hash == check_hash


def get_db_connection():
    """Подключение к базе данных"""
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        raise Exception('DATABASE_URL not configured')
    return psycopg2.connect(dsn)


def register_or_login_user(telegram_data: dict) -> dict:
    """Регистрация или вход пользователя через Telegram"""
    telegram_id = telegram_data.get('id')
    first_name = telegram_data.get('first_name', 'Клиент')
    last_name = telegram_data.get('last_name', '')
    username = telegram_data.get('username', '')
    photo_url = telegram_data.get('photo_url', '')
    
    full_name = f"{first_name} {last_name}".strip()
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        # Проверяем, существует ли пользователь
        cur.execute("""
            SELECT id, name, phone, cashback, role, created_at
            FROM t_p87786830_battery_store_app.users
            WHERE telegram_id = %s
        """, (str(telegram_id),))
        
        user = cur.fetchone()
        
        if user:
            # Пользователь уже существует - обновляем данные
            cur.execute("""
                UPDATE t_p87786830_battery_store_app.users 
                SET name = %s, telegram_username = %s, telegram_photo = %s, last_login = NOW()
                WHERE telegram_id = %s
                RETURNING id, name, phone, cashback, role
            """, (full_name, username, photo_url, str(telegram_id)))
            
            updated_user = cur.fetchone()
            conn.commit()
            
            return {
                'id': updated_user[0],
                'name': updated_user[1],
                'phone': updated_user[2] or '',
                'cashback': float(updated_user[3]) if updated_user[3] else 0.0,
                'role': updated_user[4],
                'telegram_id': telegram_id,
                'telegram_username': username,
                'is_new': False
            }
        else:
            # Новый пользователь - регистрируем
            cur.execute("""
                INSERT INTO t_p87786830_battery_store_app.users (telegram_id, name, telegram_username, telegram_photo, phone, role, cashback, created_at, last_login)
                VALUES (%s, %s, %s, %s, '', 'client', 0, NOW(), NOW())
                RETURNING id, name, phone, cashback, role
            """, (str(telegram_id), full_name, username, photo_url))
            
            new_user = cur.fetchone()
            conn.commit()
            
            return {
                'id': new_user[0],
                'name': new_user[1],
                'phone': new_user[2] or '',
                'cashback': float(new_user[3]) if new_user[3] else 0.0,
                'role': new_user[4],
                'telegram_id': telegram_id,
                'telegram_username': username,
                'is_new': True
            }
    
    finally:
        cur.close()
        conn.close()


def handler(event: dict, context) -> dict:
    """Обработчик авторизации через Telegram Login Widget"""
    
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
        body = json.loads(event.get('body', '{}'))
        print(f"[TELEGRAM LOGIN] Received data: {json.dumps(body, ensure_ascii=False)}")
        
        # Проверяем подлинность данных от Telegram
        auth_data = {
            'id': str(body.get('id')),
            'first_name': body.get('first_name', ''),
            'last_name': body.get('last_name', ''),
            'username': body.get('username', ''),
            'photo_url': body.get('photo_url', ''),
            'auth_date': str(body.get('auth_date')),
            'hash': body.get('hash')
        }
        
        # Удаляем пустые поля для корректной проверки
        auth_data = {k: v for k, v in auth_data.items() if v}
        print(f"[TELEGRAM LOGIN] Auth data for verification: {json.dumps(auth_data, ensure_ascii=False)}")
        
        if not verify_telegram_auth(auth_data.copy()):
            print("[TELEGRAM LOGIN] ❌ Verification FAILED")
            return {
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Invalid Telegram authentication'})
            }
        
        print("[TELEGRAM LOGIN] ✅ Verification PASSED")
        
        # Регистрируем или входим
        user_data = register_or_login_user(body)
        print(f"[TELEGRAM LOGIN] User data: {json.dumps(user_data, ensure_ascii=False, default=str)}")
        
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
        print(f"[TELEGRAM LOGIN] ❌ Exception: {str(e)}")
        import traceback
        print(f"[TELEGRAM LOGIN] Traceback: {traceback.format_exc()}")
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }