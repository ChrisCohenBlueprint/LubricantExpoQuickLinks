const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    linkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Link', required: true },
    timestamp: { type: Date, default: Date.now },
    userAgent: { type: String },
    ipHash: { type: String }, // Hashed IP for privacy but unique tracking
    platform: { type: String } // mobile, desktop, etc.
});

module.exports = mongoose.model('Analytics', analyticsSchema);
