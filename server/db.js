import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'safe_zone_alert',
    password: 'password', // USER: Please update this with your actual password
    port: 5432,
});

export const query = (text, params) => pool.query(text, params);
