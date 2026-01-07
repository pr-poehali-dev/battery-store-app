-- Добавление полей для авторизации через Telegram
ALTER TABLE t_p87786830_battery_store_app.users 
ADD COLUMN IF NOT EXISTS telegram_id VARCHAR(50) UNIQUE,
ADD COLUMN IF NOT EXISTS telegram_username VARCHAR(255),
ADD COLUMN IF NOT EXISTS telegram_photo TEXT;

-- Создаем индекс для быстрого поиска по telegram_id
CREATE INDEX IF NOT EXISTS idx_users_telegram_id ON t_p87786830_battery_store_app.users(telegram_id);
