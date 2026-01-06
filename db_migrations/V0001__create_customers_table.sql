CREATE TABLE IF NOT EXISTS t_p87786830_battery_store_app.customers (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    cashback DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_customers_phone ON t_p87786830_battery_store_app.customers(phone);

COMMENT ON TABLE t_p87786830_battery_store_app.customers IS 'Таблица клиентов магазина аккумуляторов';
COMMENT ON COLUMN t_p87786830_battery_store_app.customers.cashback IS 'Накопленный кэшбэк клиента';