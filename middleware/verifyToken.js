const session = require('../session/session')
const jwt = require('jsonwebtoken')
const variables = require('../config')
const User = require('../models/user')

const check = async (req, res, next) => {
    // const cookies = req.headers.cookie
    // console.log(cookies)
    const token = req.cookies && req.cookies.authToken
    // console.log(token)
    
    if (!token) {
        session.isLoggedIn = false
        session.email = ""
        session.username = ""
        // console.log("no token")
        next()

        return
    }
    jwt.verify(token, String(variables.jwt_secret), async (err, decoded) => {
        if (err) {
            console.log("err token")
            session.isLoggedIn = false
            session.email = ""
            session.username = ""
            return
        }

        let currentUser
        try {
            currentUser = await User.findOne({ _id: decoded._id }).exec()
        } catch (err) {
            console.log(err)
        }

        if (currentUser) {
            session.isLoggedIn = true
            session.username = currentUser.username
            session.email = currentUser.email
        }
    })
    next()
}

module.exports = check