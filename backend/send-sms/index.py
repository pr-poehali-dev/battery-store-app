"""
API для отправки SMS-кодов через SMSC.ru
"""
import json
import os
import random
import psycopg2
from datetime import datetime, timedelta
import requests

DB_URL = os.environ.get('DATABASE_URL')
SMS_API_KEY = os.environ.get('SMS_API_KEY', '')

def normalize_phone(phone: str) -> str:
    """Нормализация номера телефона"""
    digits = ''.join(filter(str.isdigit, phone))
    if digits.startswith('8') and len(digits) == 11:
        digits = '7' + digits[1:]
    if not digits.startswith('7') and len(digits) == 10:
        digits = '7' + digits
    return digits

def generate_code() -> str:
    """Генерация 4-значного кода"""
    return str(random.randint(1000, 9999))

def send_sms_smsc(phone: str, code: str) -> bool:
    """Отправка SMS через SMSC.ru"""
    if not SMS_API_KEY or ':' not in SMS_API_KEY:
        print(f"Dev mode: SMS code {code} for {phone}")
        return False
    
    try:
        login, password = SMS_API_KEY.split(':', 1)
        
        url = 'https://smsc.ru/sys/send.php'
        params = {
            'login': login,
            'psw': password,
            'phones': phone,
            'mes': f'Ваш код: {code}\nМир Аккумуляторов',
            'fmt': '3'
        }
        
        response = requests.get(url, params=params, timeout=10)
        result = response.json()
        
        if 'error' in result:
            print(f"SMSC error: {result}")
            return False
            
        return True
    except Exception as e:
        print(f"SMS send error: {e}")
        return False

def handler(event: dict, context) -> dict:
    """Обработка отправки SMS"""
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
        action = body.get('action', 'send')
        phone = normalize_phone(body.get('phone', '').strip())
        
        if not phone or len(phone) < 11:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Укажите номер телефона'}),
                'isBase64Encoded': False
            }
        
        conn = psycopg2.connect(DB_URL)
        cur = conn.cursor()
        
        # Проверка кода
        if action == 'verify':
            code = body.get('code', '').strip()
            name = body.get('name', 'Клиент').strip()
            
            if not code:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Укажите код'}),
                    'isBase64Encoded': False
                }
            
            # Проверка кода в БД
            cur.execute(
                """SELECT id FROM sms_codes 
                   WHERE phone = %s AND code = %s 
                   AND expires_at > NOW() AND verified = FALSE
                   ORDER BY created_at DESC LIMIT 1""",
                (phone, code)
            )
            sms_record = cur.fetchone()
            
            if not sms_record:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Неверный или истекший код'}),
                    'isBase64Encoded': False
                }
            
            # Отметить код использованным
            cur.execute("UPDATE sms_codes SET verified = TRUE WHERE id = %s", (sms_record[0],))
            
            # Проверка/создание пользователя
            cur.execute("SELECT id, name, cashback, role FROM users WHERE phone = %s", (phone,))
            user = cur.fetchone()
            
            if not user:
                cur.execute(
                    "INSERT INTO users (phone, name, last_login) VALUES (%s, %s, NOW()) RETURNING id, name, cashback, role",
                    (phone, name)
                )
                user = cur.fetchone()
            else:
                cur.execute("UPDATE users SET last_login = NOW() WHERE id = %s", (user[0],))
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'user': {
                        'id': user[0],
                        'phone': phone,
                        'name': user[1],
                        'cashback': float(user[2]) if user[2] else 0,
                        'role': user[3]
                    }
                }),
                'isBase64Encoded': False
            }
        
        # Отправка SMS
        # Деактивация старых кодов
        cur.execute("UPDATE sms_codes SET verified = TRUE WHERE phone = %s AND verified = FALSE", (phone,))
        
        # Генерация кода
        code = generate_code()
        expires_at = datetime.now() + timedelta(minutes=5)
        
        cur.execute(
            "INSERT INTO sms_codes (phone, code, expires_at) VALUES (%s, %s, %s)",
            (phone, code, expires_at)
        )
        conn.commit()
        
        # Отправка SMS
        sms_sent = send_sms_smsc(phone, code)
        
        cur.close()
        conn.close()
        
        response_body = {
            'success': True,
            'message': 'Код отправлен на ваш номер'
        }
        
        # В dev режиме показываем код
        if not sms_sent:
            response_body['dev_code'] = code
            response_body['message'] = 'Код отправлен (тестовый режим)'
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(response_body),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }