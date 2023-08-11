const dotenv = require('dotenv')

dotenv.config()

const variables = {
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
    port: process.env.PORT,
    jwt_secret: process.env.SECRET,
    api_key: process.env.API_KEY,
    app_password: process.env.APP_PASSWORD,
    stripe_publishable_key: process.env.STRIPE_PUBLISHABLE_KEY,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY
}

module.exports = variables