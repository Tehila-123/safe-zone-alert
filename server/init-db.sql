CREATE TABLE IF NOT EXISTS accidents (
    id SERIAL PRIMARY KEY,
    time VARCHAR(10) NOT NULL,
    location VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'New',
    coordinates VARCHAR(100) NOT NULL,
    speed INTEGER DEFAULT 0,
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed data
INSERT INTO accidents (time, location, status, coordinates, speed, address)
VALUES 
('08:41', 'Kimironko', 'New', '-1.9456, 30.0615', 0, 'KG 15 Ave, Kimironko'),
('08:30', 'Nyamirambo', 'Unit informed', '-1.9789, 30.0412', 45, 'KN 3 Rd, Nyamirambo')
ON CONFLICT DO NOTHING;
