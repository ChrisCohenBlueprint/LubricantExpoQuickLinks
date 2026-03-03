/* server.js - ROOT VERSION */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// FIX: Importing from root instead of ./models/
const Link = require('./link'); 
const Analytics = require('./analytics'); 

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the root directory
app.use(express.static('./')); 

// Connection to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Route to get links
app.get('/api/links', async (req, res) => {
    try {
        const links = await Link.find({ active: true }).sort('order');
        res.json(links);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch links' });
    }
});

// Route for tracked redirection
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
