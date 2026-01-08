"""
Скрипт для настройки команд бота
Запустить один раз для установки команды /start
"""
import requests

TELEGRAM_TOKEN = "8587363761:AAFkNxwiHaiE5YN5SMBjXhRMJjqhNmroFvc"
TELEGRAM_API = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}"

# Устанавливаем команды бота
commands = [
    {"command": "start", "description": "🏠 Главное меню"}
]

response = requests.post(
    f"{TELEGRAM_API}/setMyCommands",
    json={"commands": commands}
)

print("Команды бота установлены:", response.json())
