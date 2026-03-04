const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Models - Flat Structure (Sit in the main folder on GitHub)
const Link = require('./link');
const Analytics = require('./analytics');
const Subscriber = require('./subscriber');

const app = express();
app.use(cors());
app.use(express.json());

// Step 1: Tell Express where all your website files (html, css, js) are:
// We check BOTH the root and the 'public' folder just in case
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// Step 2: Explicitly send index.html when someone visits the main site URL
app.get('/', (req, res) => {
    // Try public first, then root
    res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
        if (err) {
            res.sendFile(path.join(__dirname, 'index.html'), (err2) => {
                if (err2) {
                    res.status(404).send('index.html not found in root or public folder');
                }
            });
        }
    });
});

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    console.error('CRITICAL ERROR: MONGODB_URI is not defined in Render environment variables.');
    process.exit(1);
}

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Successfully'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// API Routes
app.get('/api/links', async (req, res) => {
    try {
        const links = await Link.find({ active: true }).sort('order');
        res.json(links);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch links' });
    }
});

app.get('/l/:id', async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        if (!link) return res.status(404).send('Link not found');
        const hit = new Analytics({
            linkId: link._id,
            userAgent: req.headers['user-agent'],
            platform: req.headers['sec-ch-ua-platform'] || 'unknown'
        });
        await hit.save();
        res.redirect(link.url);
    } catch (err) {
        res.status(500).send('Internal server error');
    }
});

app.post('/api/subscribe', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: 'Email is required' });
        const existing = await Subscriber.findOne({ email });
        if (existing) return res.status(400).json({ error: 'Already subscribed!' });
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();
        res.status(201).json({ message: 'Subscribed successfully!' });
    } catch (err) {
        console.error('Subscription error:', err);
        res.status(500).json({ error: 'Failed to subscribe.' });
    }
});

const PORT = process.env.PORT || 10000; // Match Render's default
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
