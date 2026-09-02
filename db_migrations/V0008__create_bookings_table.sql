CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    booking_date VARCHAR(255),
    guests VARCHAR(50),
    comment TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'new',
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);