#!/usr/bin/env python3
"""
Скрипт для установки команд бота через Telegram API
Запустить один раз: python3 backend/set-bot-commands.py
"""
import requests

TELEGRAM_TOKEN = "8587363761:AAFkNxwiHaiE5YN5SMBjXhRMJjqhNmroFvc"

# Устанавливаем команды бота
commands = [
    {"command": "start", "description": "🏠 Главное меню"}
]

response = requests.post(
    f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/setMyCommands",
    json={"commands": commands}
)

result = response.json()
if result.get('ok'):
    print("✅ Команды бота успешно установлены!")
    print("Теперь пользователи увидят /start в меню")
else:
    print(f"❌ Ошибка: {result}")
