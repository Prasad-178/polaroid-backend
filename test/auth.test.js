const request = require('supertest')

const baseURL = "http://localhost:3500"

describe('POST /user/login', () => {
    it('should return 200 OK and user details if login is successful', async () => {
        const response = await request(baseURL)
            .post('/user/login')
            .send({ email: "test@gmail.com", password: "Test@123" })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('email')
    })

    it('should return 403 Error if password is wrong', async () => {
        const response = await request(baseURL)
            .post('/user/login')
            .send({ email: "test@gmail.com", password: "WrongPass@123" })

        expect(response.status).toBe(403)
    })

    it('should return 404 Error if user not found', async () => {
        const response = await request(baseURL)
            .post('/user/login')
            .send({ email: "nouserfound@gmail.com", password: "WrongPass@123" })

        expect(response.status).toBe(404)
    })
})