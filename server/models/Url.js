const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortCode: {
        type: String,
        required: true
    },
    longUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    lastAccessed: {
        type: Date,
        default: ""
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('Url', urlSchema);