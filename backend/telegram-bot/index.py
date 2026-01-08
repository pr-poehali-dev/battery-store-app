import json
import os
import requests

TELEGRAM_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN', '8587363761:AAFkNxwiHaiE5YN5SMBjXhRMJjqhNmroFvc')
TELEGRAM_API = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}"
MANAGER_CHAT_ID = os.environ.get('MANAGER_TELEGRAM_ID', None)  # ID менеджера для пересылки вопросов

STORES = [
    {"name": "Павловича, 26", "phone": "+7 (4212) 45-41-41"},
    {"name": "Павловича, 11", "phone": "+7 (4212) 45-99-99"},
    {"name": "Краснореченская, 149", "phone": "+7 (4212) 47-41-41"},
    {"name": "Воронежская, 66", "phone": "+7 (4212) 28-41-41"},
    {"name": "Суворова, 73а/2", "phone": "+7 (4212) 97-41-41"},
    {"name": "Проспект 60-летия Октября, 154", "phone": "+7 (4212) 28-45-45"},
]


def send_message(chat_id: int, text: str, reply_markup=None):
    """Отправка сообщения в Telegram"""
    payload = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML",
    }
    if reply_markup:
        payload["reply_markup"] = reply_markup
    
    requests.post(f"{TELEGRAM_API}/sendMessage", json=payload)


def handle_start(chat_id: int):
    """Обработка команды /start"""
    keyboard = {
        "keyboard": [
            [{"text": "🔋 Подобрать аккумулятор"}],
            [{"text": "📍 Наши магазины"}, {"text": "📞 Контакты"}],
            [{"text": "❓ Частые вопросы"}],
        ],
        "resize_keyboard": True,
    }
    
    text = (
        "👋 <b>Добро пожаловать в Мир Аккумуляторов!</b>\n\n"
        "Я помогу вам:\n"
        "🔋 Подобрать аккумулятор для вашего авто\n"
        "📍 Найти ближайший магазин\n"
        "💬 Получить консультацию\n\n"
        "Выберите нужный пункт меню ⬇️"
    )
    send_message(chat_id, text, keyboard)


def handle_stores(chat_id: int):
    """Показать список магазинов"""
    text = "📍 <b>Наши магазины в Хабаровске:</b>\n\n"
    for i, store in enumerate(STORES, 1):
        text += f"{i}. {store['name']}\n📞 {store['phone']}\n\n"
    
    text += "🌐 Все адреса и карта на сайте:\nmiraccum.ru"
    send_message(chat_id, text)


def handle_selection(chat_id: int):
    """Помощь в подборе аккумулятора"""
    text = (
        "🔋 <b>Подбор аккумулятора</b>\n\n"
        "Напишите мне:\n"
        "• Марку и модель авто\n"
        "• Год выпуска\n\n"
        "Пример: <i>Toyota Camry 2018</i>\n\n"
        "Или позвоните в любой магазин — наши специалисты помогут!"
    )
    send_message(chat_id, text)


def handle_faq(chat_id: int):
    """Частые вопросы"""
    text = (
        "❓ <b>Частые вопросы:</b>\n\n"
        "<b>Как подобрать аккумулятор?</b>\n"
        "Напишите марку авто и год — мы подберём!\n\n"
        "<b>Есть ли доставка?</b>\n"
        "Да, доставка по Хабаровску.\n\n"
        "<b>Гарантия?</b>\n"
        "На все аккумуляторы — гарантия производителя.\n\n"
        "<b>Режим работы?</b>\n"
        "Пн-Пт: 9:00-19:00\nСб-Вс: 10:00-18:00"
    )
    send_message(chat_id, text)


def check_compatibility(text: str) -> str:
    """Проверка совместимости аккумулятора с авто"""
    text_lower = text.lower()
    
    # База знаний о популярных авто
    compatibility_db = {
        'toyota camry': '🔋 Для Toyota Camry подходят:\n• 55-70 А·ч для двигателя 2.0-2.5л\n• 75-95 А·ч для двигателя 3.5л\n\n📏 Размер: 232x173x225 мм\n🔌 Клеммы: Азиатские (тонкие)\n\n💰 Цена от 6 500₽',
        'honda': '🔋 Для Honda подходят:\n• 50-65 А·ч для большинства моделей\n• Клеммы: Азиатские (тонкие)\n\n📏 Стандартный размер: 232x173x225 мм\n💰 Цена от 5 900₽',
        'nissan': '🔋 Для Nissan подходят:\n• 55-75 А·ч (зависит от модели)\n• Клеммы: Азиатские\n\n📞 Для точного подбора звоните: +7 (4212) 45-41-41',
        'lada': '🔋 Для Lada/ВАЗ подходят:\n• 55-62 А·ч\n• Клеммы: Европейские (обратная полярность)\n\n📏 Размер: 242x175x190 мм\n💰 Цена от 4 500₽',
        'hyundai': '🔋 Для Hyundai подходят:\n• 60-75 А·ч\n• Клеммы: Азиатские\n\n📞 Точный подбор: +7 (4212) 45-41-41',
        'kia': '🔋 Для Kia подходят:\n• 60-75 А·ч\n• Клеммы: Азиатские\n\n📞 Звоните для подбора: +7 (4212) 45-41-41',
    }
    
    # Ищем совпадения
    for key, response in compatibility_db.items():
        if key in text_lower:
            return response
    
    return None


def forward_to_manager(chat_id: int, username: str, text: str):
    """Пересылка вопроса менеджеру"""
    if not MANAGER_CHAT_ID:
        return
    
    manager_text = (
        f"📩 <b>Новый вопрос от клиента</b>\n\n"
        f"👤 От: {username or 'Пользователь'}\n"
        f"🆔 Chat ID: {chat_id}\n\n"
        f"💬 Сообщение:\n{text}\n\n"
        f"<i>Ответьте клиенту напрямую в его чат</i>"
    )
    send_message(MANAGER_CHAT_ID, manager_text)


def handle_contacts(chat_id: int):
    """Контактная информация"""
    text = (
        "📞 <b>Связаться с нами:</b>\n\n"
        "🌐 Сайт: miraccum.ru\n"
        "📱 Telegram: @mir_akkum_shop_bot\n\n"
        "<b>Телефоны магазинов:</b>\n"
    )
    for store in STORES[:3]:
        text += f"• {store['name']}: {store['phone']}\n"
    
    send_message(chat_id, text)


def handler(event: dict, context) -> dict:
    """Обработчик webhook-запросов от Telegram"""
    
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
        
        if 'message' not in body:
            return {'statusCode': 200, 'body': json.dumps({'ok': True})}
        
        message = body['message']
        chat_id = message['chat']['id']
        text = message.get('text', '')
        
        if text == '/start':
            handle_start(chat_id)
        elif text == '🔋 Подобрать аккумулятор':
            handle_selection(chat_id)
        elif text == '📍 Наши магазины':
            handle_stores(chat_id)
        elif text == '📞 Контакты':
            handle_contacts(chat_id)
        elif text == '❓ Частые вопросы':
            handle_faq(chat_id)
        else:
            # Проверяем, есть ли автоответ о совместимости
            compatibility_response = check_compatibility(text)
            
            if compatibility_response:
                send_message(chat_id, compatibility_response)
            else:
                # Пересылаем менеджеру
                username = message.get('from', {}).get('username', None)
                if username:
                    username = f"@{username}"
                else:
                    first_name = message.get('from', {}).get('first_name', 'Пользователь')
                    username = first_name
                
                forward_to_manager(chat_id, username, text)
                
                send_message(
                    chat_id,
                    "Спасибо за сообщение! Наш менеджер получил ваш вопрос и скоро ответит.\n\n"
                    "Для быстрого ответа позвоните:\n📞 +7 (4212) 45-41-41"
                )
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True})
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': str(e)})
        }