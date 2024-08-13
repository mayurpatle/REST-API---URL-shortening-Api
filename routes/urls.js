const express = require('express');
const router = express.Router();
const { createShortUrl , getOriginalUrl  ,  updateShortUrl } = require('../controllers/urlController');

router.post('/shorten', createShortUrl);

// Route to retrieve the original URL and redirect
router.get('/shorten/:shortCode', getOriginalUrl);

// Route to update an existing short URL
router.put('/shorten/:shortCode', updateShortUrl);



module.exports = router;

