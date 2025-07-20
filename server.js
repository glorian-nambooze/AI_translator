import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const LIBRETRANSLATE_API = process.env.LIBRETRANSLATE_API;

app.use(cors());
app.use(express.json());

app.get('/languages', async (req, res) => {
    try {
        const response = await fetch(`${LIBRETRANSLATE_API}/languages`);
        const languages = await response.json();
        res.json(languages);
    } catch (err) {
        res.status(500).json({ error: 'Error getting languages' });
    }
});



app.post('/translate', async (req, res) => {
    try {
        const { q, source, target } = req.body;
        console.log("Translate request:", { q, source, target });

        const response = await fetch(`${LIBRETRANSLATE_API}/translate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ q, source, target, format: 'text' }),
        });

        console.log("Raw response status:", response.status);
        const data = await response.json();
        console.log("Parsed response data:", data);

        if (!data.translatedText) {
            return res.status(500).json({ error: "No translatedText in API response" });
        }

        res.json({ translatedText: data.translatedText });
    } catch (err) {
        console.error("Translate error:", err);
        res.status(500).json({ error: 'Error translating text' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Backend server is working');
});
