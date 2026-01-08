-- Добавление полей для авторизации через Яндекс ID
ALTER TABLE t_p87786830_battery_store_app.users 
ADD COLUMN IF NOT EXISTS yandex_id VARCHAR(50) UNIQUE,
ADD COLUMN IF NOT EXISTS email VARCHAR(255);

-- Создаем индекс для быстрого поиска по yandex_id
CREATE INDEX IF NOT EXISTS idx_users_yandex_id ON t_p87786830_battery_store_app.users(yandex_id);
