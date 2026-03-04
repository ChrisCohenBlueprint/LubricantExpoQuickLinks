const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Link = require('./link'); // Changed from ./models/Link
const Analytics = require('./analytics'); // Changed from ./models/Analytics

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('./')); // Changed from 'public'

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
// 1. Fetch all links
app.get('/api/links', async (req, res) => {
    try {
        const links = await Link.find({ active: true }).sort('order');
        res.json(links);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch links' });
    }
});

// 2. Redirect and log hit
app.get('/l/:id', async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        if (!link) return res.status(404).send('Link not found');

        // Log analytics
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

// 3. Newsletter Subscription
const Subscriber = require('./models/Subscriber');
app.post('/api/subscribe', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: 'Email is required' });

        // Check if already subscribed
        const existing = await Subscriber.findOne({ email });
        if (existing) {
            return res.status(400).json({ error: 'Already subscribed!' });
        }

        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        res.status(201).json({ message: 'Subscribed successfully!' });
    } catch (err) {
        console.error('Subscription error:', err);
        res.status(500).json({ error: 'Failed to subscribe. Please try again.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
