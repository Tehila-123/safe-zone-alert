import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { query } from './db.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Get all accidents
app.get('/api/accidents', async (req, res) => {
    try {
        const result = await query('SELECT * FROM accidents ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Receive a new accident
app.post('/api/accidents', async (req, res) => {
    const { time, location, coordinates, address, speed } = req.body;

    const currentTime = time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const currentAddress = address || location || "Unknown Address";
    const currentCoordinates = coordinates || "0,0";
    const currentSpeed = speed || 0;

    try {
        const result = await query(
            'INSERT INTO accidents (time, location, coordinates, address, speed, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [currentTime, location || "Unknown Location", currentCoordinates, currentAddress, currentSpeed, "New"]
        );
        const newAccident = result.rows[0];
        console.log("New accident received and stored:", newAccident);
        res.status(201).json(newAccident);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
