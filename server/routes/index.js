const express = require('express');
const router = express.Router();

const Url = require('../models/Url');

// @route     GET /:shortcode
// @desc      Redirect to long/original URL
router.get('/:shortcode', async (req, res) => {
    const { shortcode: shortCode } = req.params
    try {
        const url = await Url.findOne({ shortCode });

        if (url) {
            url.lastAccessed = Date.now();
            url.clicks++
            await url.save()
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json('Shortcode not found in database');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});

// @route     GET /:shortcode/stats
// @desc      See when the shortcode was registered, last accessed and how many times.
router.get('/:shortcode/stats', async (req, res) => {
    const { shortcode: shortCode } = req.params
    try {
        const url = await Url.findOne({ shortCode });

        if (url) {
            res.json(url)
        } else {
            return res.status(404).json('Shortcode not found in database');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }

});

module.exports = router;