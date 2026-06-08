CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    price INTEGER,
    price_bottle INTEGER,
    price_glass INTEGER,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

COMMENT ON COLUMN menu_items.category IS 'Категория: cocktails_author, cocktails_classic, shots_author, shots_classic, whiskey, beer, wine, energy, drinks, hookah, hookah_premium';
COMMENT ON COLUMN menu_items.price IS 'Основная цена (за единицу / 50мл)';
COMMENT ON COLUMN menu_items.price_bottle IS 'Цена за бутылку';
COMMENT ON COLUMN menu_items.price_glass IS 'Цена за бокал';