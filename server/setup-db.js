import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Client } = pg;

async function setup() {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: '', // Matches user's update
        port: 5432,
    });

    try {
        await client.connect();

        // Check if database exists
        const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'safe_zone_alert'");
        if (res.rowCount === 0) {
            console.log("Creating database safe_zone_alert...");
            await client.query('CREATE DATABASE safe_zone_alert');
        } else {
            console.log("Database safe_zone_alert already exists.");
        }
        await client.end();

        // Connect to the new database
        const dbClient = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'safe_zone_alert',
            password: '',
            port: 5432,
        });

        await dbClient.connect();
        console.log("Connected to safe_zone_alert database.");

        const sql = fs.readFileSync(path.join(__dirname, 'init-db.sql'), 'utf8');
        console.log("Running initialization script...");
        await dbClient.query(sql);
        console.log("Database setup complete.");
        await dbClient.end();
    } catch (err) {
        console.error("Error setting up database:", err);
        process.exit(1);
    }
}

setup();
