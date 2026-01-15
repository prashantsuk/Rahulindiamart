const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Test endpoint
app.get('/test', (req, res) => {
    res.send('<h1>Server is working!</h1>');
});

let cookieStore = null;

app.post('/api/set-cookies', (req, res) => {
    cookieStore = req.body.cookies;
    res.json({ success: true });
});

app.post('/api/check-leads', async (req, res) => {
    if (!cookieStore) {
        return res.status(400).json({ error: 'No cookies set' });
    }
    
    const cookieHeader = cookieStore.map(c => `${c.name}=${c.value}`).join('; ');
    
    try {
        // Mock response - simulating lead check
        res.json({ success: true, data: 'Leads checked successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on http://0.0.0.0:3000');
    console.log('Access from Windows browser: http://172.21.136.254:3000');
});