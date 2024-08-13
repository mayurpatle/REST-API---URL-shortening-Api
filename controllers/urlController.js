const Url = require('../models/Url');
 // for generating unique short codes

// Controller function to create a new short URL
const createShortUrl = async (req, res) => {
  const { url } = req.body;

  // Validate the request body
  if (!url) {
    return res.status(400).json({ message: 'URL is required' });
  }

  try {
    // Dynamically import nanoid
    const { nanoid } = await import('nanoid');
    // Generate a unique short code using nanoid
    const shortCode = nanoid(6);

    // Check if the shortCode already exists
    const existingUrl = await Url.findOne({ shortCode });
    if (existingUrl) {
      return res.status(400).json({ message: 'Short code already exists, try again' });
    }

    // Create a new URL document
    const newUrl = new Url({
      url,
      shortCode,
    });

    // Save the new URL document to the database
    await newUrl.save();

    // Return the created URL as the response
    res.status(201).json(newUrl);
  } catch (error) {
    console.error('Error creating short URL:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const getOriginalUrl = async (req, res) => {
    const { shortCode } = req.params;

    try {
        // Find the URL document by the short code
        const urlDoc = await Url.findOne({ shortCode });

        if (!urlDoc) {
            // Return 404 if the short code is not found
            return res.status(404).json({ message: 'Short URL not found' });
        }

        // Update the access count for statistics
        urlDoc.accessCount += 1;
        await urlDoc.save();

        // Redirect to the original URL
        res.redirect(urlDoc.url);
    } catch (error) {
        console.error('Error retrieving original URL:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Controller function to update an existing short URL
const updateShortUrl = async (req, res) => {
    const { shortCode } = req.params;
    const { url } = req.body;

    // Validate the request body
    if (!url) {
        return res.status(400).json({ message: 'URL is required' });
    }

    try {
        // Find the URL document by the short code
        const urlDoc = await Url.findOne({ shortCode });

        if (!urlDoc) {
            // Return 404 if the short code is not found
            return res.status(404).json({ message: 'Short URL not found' });
        }

        // Update the URL and updatedAt fields
        urlDoc.url = url;
        urlDoc.updatedAt = new Date();
        await urlDoc.save();

        // Return the updated URL document as the response
        res.status(200).json(urlDoc);
    } catch (error) {
        console.error('Error updating short URL:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createShortUrl , getOriginalUrl  , updateShortUrl };
