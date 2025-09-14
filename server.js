const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// A simple in-memory "database"
let urlDatabase = {};

// Endpoint to shorten a URL
app.post('/shorten', (req, res) => {
    const { longUrl } = req.body;
    if (!longUrl) {
        return res.status(400).json({ error: 'longUrl is required' });
    }

    const shortId = Math.random().toString(36).substring(2, 7);
    urlDatabase[shortId] = longUrl;

    // You could also save to a JSON file to persist data
    // fs.writeFileSync('urls.json', JSON.stringify(urlDatabase, null, 2));

    res.json({ shortUrl: `http://localhost:${PORT}/${shortId}` });
});

// Endpoint to redirect the short URL
app.get('/:shortId', (req, res) => {
    const { shortId } = req.params;
    const longUrl = urlDatabase[shortId];

    if (longUrl) {
        res.redirect(longUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
