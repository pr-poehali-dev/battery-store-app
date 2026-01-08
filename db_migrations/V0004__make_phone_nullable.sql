-- Делаем поле phone необязательным для авторизации через Telegram
ALTER TABLE t_p87786830_battery_store_app.users 
ALTER COLUMN phone SET DEFAULT NULL;

ALTER TABLE t_p87786830_battery_store_app.users 
ALTER COLUMN phone TYPE character varying(20);
