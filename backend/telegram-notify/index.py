import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any


def handler(event: Dict[str, Any], context) -> Dict[str, Any]:
    """Отправка уведомлений о бронировании в Telegram"""
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body_str = event.get('body', '{}')
        if not body_str or body_str.strip() == '':
            body_str = '{}'
        
        body = json.loads(body_str)
        
        reservation = body.get('reservation')
        if not reservation:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Reservation data required'})
            }
        
        bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        manager_chat_id = os.environ.get('MANAGER_TELEGRAM_ID')
        
        if not bot_token or not manager_chat_id:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Telegram credentials not configured'})
            }
        
        product = reservation.get('product', {})
        message = f"""
🔔 <b>Новое бронирование!</b>

📦 <b>Товар:</b> {product.get('name', 'N/A')}
🏷 <b>Бренд:</b> {product.get('brand', 'N/A')}
💰 <b>Цена:</b> {product.get('price', 0):,} ₽
📊 <b>Количество:</b> {reservation.get('quantity', 1)} шт.

👤 <b>Клиент:</b> {reservation.get('customerName', 'N/A')}
📱 <b>Телефон:</b> {reservation.get('customerPhone', 'N/A')}

🏪 <b>Магазин:</b> {reservation.get('store', 'N/A')}
📅 <b>Дата получения:</b> {reservation.get('pickupDate', 'N/A')}
🕒 <b>Время:</b> {reservation.get('pickupTime', 'N/A')}

🆔 <b>ID бронирования:</b> <code>{reservation.get('id', 'N/A')}</code>
        """.strip()
        
        telegram_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        
        data = urllib.parse.urlencode({
            'chat_id': manager_chat_id,
            'text': message,
            'parse_mode': 'HTML'
        }).encode('utf-8')
        
        req = urllib.request.Request(telegram_url, data=data, method='POST')
        
        with urllib.request.urlopen(req, timeout=10) as response:
            result = json.loads(response.read().decode('utf-8'))
            
            if result.get('ok'):
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'success': True,
                        'message': 'Notification sent successfully'
                    })
                }
            else:
                return {
                    'statusCode': 500,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'success': False,
                        'error': result.get('description', 'Unknown error')
                    })
                }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': str(e)
            })
        }