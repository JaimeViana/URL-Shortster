const express = require('express');
const router = express.Router();
const monk = require('monk');
const config = require('config');
const validUrl = require('valid-url');
const { nanoid } = require('nanoid');

const dbUrl = config.get('mongoDB_URI');
const db = monk(dbUrl)
const urls = db.get('urls');
urls.createIndex({ shortCode: 1 }, { unique: true });
const Url = require('../models/Url');

// @route     POST /api/url/shorten
// @desc      Create short URL
router.post('/shorten', async (req, res) => {
    let { longUrl, shortCode, createdAt, lastAccessed, clicks } = req.body;

    // Check long url
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });

            if (url) {
                res.json(url);
                console.log('Url already shortened')
            } else {
                //Check if custom url
                if (!shortCode) {
                    shortCode = nanoid(6);
                } else if (shortCode.length < 4) {
                    throw new Error('Shortcodes must be at least 4 characters long.');
                } else {
                    console.log(shortCode);
                    const existing = await urls.findOne({ shortCode });
                    console.log(existing);
                    if (existing) {
                        throw new Error('Slug in use.');
                    }
                }

                shortCode = shortCode.toLowerCase();

                url = new Url({
                    shortCode,
                    longUrl,
                    createdAt,
                    lastAccessed,
                    clicks
                });

                await url.save();

                res.status(201)
                res.json(url);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server error');
        }
    } else {
        res.status(401).json('Invalid long url');
    }
});


module.exports = router;