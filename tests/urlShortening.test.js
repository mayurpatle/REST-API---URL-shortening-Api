// tests/urlShortening.test.js
const  request  = require('supertest');
const app  =  require('../index');  
const mongoose = require('mongoose')  ; 


beforeAll(async () => {
    // Connect to a test database
    const url = `mongodb://localhost:27017/urlShortenerTest`;
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    // Clean up and close the database connection
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('URL Shortening API', () => {
    let shortCode;

    // Test the Create Short URL endpoint
    it('should create a new short URL', async () => {
        const response = await request(app)
            .post('/shorten')
            .send({
                url: 'https://www.example.com/some/long/url'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('url', 'https://www.example.com/some/long/url');
        expect(response.body).toHaveProperty('shortCode');
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');

        shortCode = response.body.shortCode; // Save the short code for later tests
    });

    // Test the Retrieve Original URL endpoint
    it('should retrieve the original URL from a short code', async () => {
        const response = await request(app).get(`/shorten/${shortCode}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('url', 'https://www.example.com/some/long/url');
        expect(response.body).toHaveProperty('shortCode', shortCode);
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
    });

    // Test the Update Short URL endpoint
    it('should update the original URL associated with a short code', async () => {
        const response = await request(app)
            .put(`/shorten/${shortCode}`)
            .send({
                url: 'https://www.example.com/some/updated/url'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('url', 'https://www.example.com/some/updated/url');
        expect(response.body).toHaveProperty('shortCode', shortCode);
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
    });

    // Test the Get URL Statistics endpoint
    it('should get statistics for a short URL', async () => {
        const response = await request(app).get(`/shorten/${shortCode}/stats`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('url', 'https://www.example.com/some/updated/url');
        expect(response.body).toHaveProperty('shortCode', shortCode);
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
        expect(response.body).toHaveProperty('accessCount');
    });

    // Test the Delete Short URL endpoint
    it('should delete a short URL', async () => {
        const response = await request(app).delete(`/shorten/${shortCode}`);

        expect(response.statusCode).toBe(204);
    });

    // Test retrieving a non-existent short code
    it('should return 404 for a non-existent short code', async () => {
        const response = await request(app).get(`/shorten/nonExistentCode`);

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('message', 'Short URL not found');
    });
});
