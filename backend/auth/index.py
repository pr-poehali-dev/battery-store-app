"""
API для авторизации клиентов через SMS-коды
"""
import json
import os
import random
import string
from datetime import datetime, timedelta
import psycopg2
import requests

DB_URL = os.environ.get('DATABASE_URL')
SMS_API_KEY = os.environ.get('SMS_API_KEY')

def generate_code() -> str:
    """Генерация 6-значного кода"""
    return ''.join(random.choices(string.digits, k=6))

def generate_session_token() -> str:
    """Генерация токена сессии"""
    return ''.join(random.choices(string.ascii_letters + string.digits, k=64))

def send_sms(phone: str, code: str) -> bool:
    """Отправка SMS через SMS.ru"""
    try:
        url = f"https://sms.ru/sms/send?api_id={SMS_API_KEY}&to={phone}&msg=Ваш код: {code}&json=1"
        response = requests.get(url, timeout=10)
        result = response.json()
        return result.get('status') == 'OK'
    except Exception as e:
        print(f"SMS send error: {e}")
        return False

def handler(event: dict, context) -> dict:
    """Обработка запросов авторизации"""
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
        action = body.get('action')
        
        conn = psycopg2.connect(DB_URL)
        cur = conn.cursor()
        
        # Отправка SMS-кода
        if action == 'send_code':
            phone = body.get('phone', '').strip()
            
            if not phone:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Укажите номер телефона'}),
                    'isBase64Encoded': False
                }
            
            # Деактивация старых кодов
            cur.execute("UPDATE sms_codes SET verified = TRUE WHERE phone = %s AND verified = FALSE", (phone,))
            
            # Генерация нового кода
            code = generate_code()
            expires_at = datetime.now() + timedelta(minutes=5)
            
            cur.execute(
                "INSERT INTO sms_codes (phone, code, expires_at) VALUES (%s, %s, %s)",
                (phone, code, expires_at)
            )
            conn.commit()
            
            # Отправка SMS (закомментировано для тестов)
            # sms_sent = send_sms(phone, code)
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'message': 'Код отправлен',
                    'dev_code': code  # Для тестирования - убрать в продакшене!
                }),
                'isBase64Encoded': False
            }
        
        # Проверка кода и вход/регистрация
        elif action == 'verify_code':
            phone = body.get('phone', '').strip()
            code = body.get('code', '').strip()
            is_registration = body.get('is_registration', False)
            remember_me = body.get('remember_me', False)
            name = body.get('name', 'Клиент')
            
            if not phone or not code:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Укажите телефон и код'}),
                    'isBase64Encoded': False
                }
            
            # Проверка кода
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
            
            # Отметить код как использованный
            cur.execute("UPDATE sms_codes SET verified = TRUE WHERE id = %s", (sms_record[0],))
            
            # Проверка пользователя
            cur.execute("SELECT id, name, cashback, role FROM users WHERE phone = %s", (phone,))
            user = cur.fetchone()
            
            if is_registration:
                if user:
                    cur.close()
                    conn.close()
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Пользователь уже существует'}),
                        'isBase64Encoded': False
                    }
                
                # Регистрация
                cur.execute(
                    "INSERT INTO users (phone, name, last_login) VALUES (%s, %s, NOW()) RETURNING id, name, cashback, role",
                    (phone, name)
                )
                user = cur.fetchone()
            else:
                if not user:
                    cur.close()
                    conn.close()
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Пользователь не найден. Зарегистрируйтесь'}),
                        'isBase64Encoded': False
                    }
                
                # Обновление last_login
                cur.execute("UPDATE users SET last_login = NOW() WHERE id = %s", (user[0],))
            
            conn.commit()
            
            user_data = {
                'id': user[0],
                'phone': phone,
                'name': user[1],
                'cashback': float(user[2]) if user[2] else 0,
                'role': user[3]
            }
            
            # Создание сессии
            session_token = None
            if remember_me:
                session_token = generate_session_token()
                expires_at = datetime.now() + timedelta(days=30)
                cur.execute(
                    "INSERT INTO user_sessions (user_id, session_token, expires_at) VALUES (%s, %s, %s)",
                    (user[0], session_token, expires_at)
                )
                conn.commit()
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'user': user_data,
                    'session_token': session_token
                }),
                'isBase64Encoded': False
            }
        
        # Проверка сессии (запомнить меня)
        elif action == 'check_session':
            session_token = body.get('session_token')
            
            if not session_token:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Token required'}),
                    'isBase64Encoded': False
                }
            
            cur.execute(
                """SELECT u.id, u.phone, u.name, u.cashback, u.role 
                   FROM user_sessions s
                   JOIN users u ON s.user_id = u.id
                   WHERE s.session_token = %s AND s.expires_at > NOW()""",
                (session_token,)
            )
            user = cur.fetchone()
            
            if not user:
                cur.close()
                conn.close()
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Сессия истекла'}),
                    'isBase64Encoded': False
                }
            
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
                        'phone': user[1],
                        'name': user[2],
                        'cashback': float(user[3]) if user[3] else 0,
                        'role': user[4]
                    }
                }),
                'isBase64Encoded': False
            }
        
        else:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Unknown action'}),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
