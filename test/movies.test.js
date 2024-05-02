const request = require('supertest')

const baseURL = "http://localhost:3500"

describe('GET /loctim/597', () => {
    it('should return 200 OK and if data is retrieved successfully', async () => {
        const response = await request(baseURL)
            .get('/loctim/597')

        expect(response.status).toBe(200)
    })
})

describe('GET /ongoingshows', () => {
    it('should return 200 OK and if data is retrieved successfully', async () => {
        const response = await request(baseURL)
            .get('/ongoingshows')

        expect(response.status).toBe(200)
    })
})

describe('GET /filmreviews/597', () => {
    it('should return 200 OK and if data is retrieved successfully', async () => {
        const response = await request(baseURL)
            .get('/filmreviews/597')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('reviews')
    })
})