// URL of the backend API
const apiUrl = 'http://localhost:3000/api/shorten';

// Function to create a new short URL
const createShortUrl = async () => {
    const longUrl = document.getElementById('longUrlInput').value;
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url : longUrl })
        });
        const data = await response.json();
        document.getElementById('result').innerText = `Short URL created: ${data.shorturl}`;
        document.getElementById('output').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById('result').innerText = 'Error creating short URL';
        console.error('Error:', error);
    }
};

// Function to retrieve the original URL
const retrieveOriginalUrl = async () => {
    const shortCode = document.getElementById('shortCodeInput').value;
    try {
        const response = await fetch(`${apiUrl}/${shortCode}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (response.status === 201) {
            document.getElementById('result').innerText = `Original URL: ${data}`;
            document.getElementById('output').innerText = JSON.stringify(data, null, 2);
        } else {
            document.getElementById('result').innerText = 'Short URL not found';
        }
    } catch (error) {
        document.getElementById('result').innerText = 'Error retrieving original URL';
        console.error('Error:', error);
    }
};

// Function to update the short URL
const updateShortUrl = async () => {
    const shortCode = document.getElementById('updateShortCodeInput').value;
    const newLongUrl = document.getElementById('updateLongUrlInput').value;
    try {
        const response = await fetch(`${apiUrl}/${shortCode}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: newLongUrl })
        });
        const data = await response.json();
        if (response.status === 200) {
            document.getElementById('result').innerText = `Short URL updated: ${data.shortCode}`;
            document.getElementById('output').innerText = JSON.stringify(data, null, 2);
        } else {
            document.getElementById('result').innerText = 'Short URL not found';
        }
    } catch (error) {
        document.getElementById('result').innerText = 'Error updating short URL';
        console.error('Error:', error);
    }
};

// Function to delete the short URL
const deleteShortUrl = async () => {
    const shortCode = document.getElementById('deleteShortCodeInput').value;
    try {
        const response = await fetch(`${apiUrl}/${shortCode}`, {
            method: 'DELETE'
        });
        if (response.status === 204) {
            document.getElementById('result').innerText = `Short URL deleted: ${shortCode}`;
        } else {
            document.getElementById('result').innerText = 'Short URL not found';
        }
    } catch (error) {
        document.getElementById('result').innerText = 'Error deleting short URL';
        console.error('Error:', error);
    }
};

// Function to get URL statistics
const getUrlStatistics = async () => {
    const shortCode = document.getElementById('statsShortCodeInput').value;
    try {
        const response = await fetch(`${apiUrl}/${shortCode}/stats` , {
            method: 'GET'
        });
        const data = await response.json();
        if (response.status === 200) {
            document.getElementById('result').innerText = `URL Statistics: ${data.accessCount} accesses`;
            document.getElementById('output').innerText = JSON.stringify(data, null, 2);
        } else {
            document.getElementById('result').innerText = 'Short URL not found';
        }
    } catch (error) {
        document.getElementById('result').innerText = 'Error getting URL statistics';
        console.error('Error:', error);
    }
};

// Event listeners for buttons
document.getElementById('createButton').addEventListener('click', createShortUrl);
document.getElementById('retrieveButton').addEventListener('click', retrieveOriginalUrl);
document.getElementById('updateButton').addEventListener('click', updateShortUrl);
document.getElementById('deleteButton').addEventListener('click', deleteShortUrl);
document.getElementById('statsButton').addEventListener('click', getUrlStatistics);
