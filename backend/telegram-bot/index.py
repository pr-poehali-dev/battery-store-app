import json
import os
import requests

TELEGRAM_TOKEN = "8587363761:AAFkNxwiHaiE5YN5SMBjXhRMJjqhNmroFvc"
TELEGRAM_API = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}"

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
    
    text += "🌐 Все адреса и карта на сайте:\npoehali.dev"
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


def handle_contacts(chat_id: int):
    """Контактная информация"""
    text = (
        "📞 <b>Связаться с нами:</b>\n\n"
        "🌐 Сайт: poehali.dev\n"
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
            send_message(
                chat_id,
                "Спасибо за сообщение! Наш менеджер свяжется с вами в ближайшее время.\n\n"
                "Для быстрого ответа позвоните по телефону:\n+7 (4212) 45-41-41"
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
