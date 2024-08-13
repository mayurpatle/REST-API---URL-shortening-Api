const express = require('express');
const router = express.Router();
const { createShortUrl , getOriginalUrl  ,  updateShortUrl , deleteShortUrl ,  getUrlStats } = require('../controllers/urlController');

router.post('/shorten', createShortUrl);

// Route to retrieve the original URL and redirect
router.get('/shorten/:shortCode', getOriginalUrl);

// Route to update an existing short URL
router.put('/shorten/:shortCode', updateShortUrl);

// Route to delete  an existing short URL
router.delete('/shorten/:shortCode', deleteShortUrl);

// Route to get statistics of a short URL
router.get('/shorten/:shortCode/stats', getUrlStats);


module.exports = router;

