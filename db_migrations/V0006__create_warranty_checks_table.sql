-- Создание таблицы для проверки гарантии аккумуляторов
CREATE TABLE IF NOT EXISTS warranty_checks (
    id SERIAL PRIMARY KEY,
    serial_number VARCHAR(50) UNIQUE NOT NULL,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    purchase_date DATE NOT NULL,
    warranty_months INTEGER NOT NULL DEFAULT 24,
    buyer_phone VARCHAR(20),
    buyer_name VARCHAR(100),
    store_address VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индекса для быстрого поиска по серийному номеру
CREATE INDEX idx_serial_number ON warranty_checks(serial_number);

-- Добавление демо-данных
INSERT INTO warranty_checks (serial_number, brand, model, purchase_date, warranty_months, buyer_phone, buyer_name, store_address) VALUES
('VARTA-2024-001234', 'VARTA', 'Blue Dynamic E11', '2024-06-15', 24, '+79141234567', 'Иванов Сергей', 'ул. Павловича, 26'),
('BOSCH-2024-005678', 'BOSCH', 'S4 005', '2024-08-22', 36, '+79147654321', 'Петрова Мария', 'ул. Павловича, 11'),
('MUTLU-2025-009012', 'MUTLU', 'SFB M2', '2025-01-05', 24, '+79149876543', 'Смирнов Алексей', 'ул. Краснореченская, 149'),
('VARTA-2023-112233', 'VARTA', 'Silver Dynamic H3', '2023-03-10', 24, '+79142223344', 'Козлов Дмитрий', 'ул. Воронежская, 66'),
('EXIDE-2024-445566', 'EXIDE', 'Premium EA722', '2024-11-18', 24, '+79145556677', 'Новикова Елена', 'ул. Суворова, 73а/2'),
('TOPLA-2024-778899', 'TOPLA', 'Energy 108', '2024-09-30', 30, '+79148889900', 'Соколов Игорь', 'пр. 60-летия Октября, 154');