const jwt = require('jsonwebtoken')
const User = require("../../models/user")
const variables = require('../../config')

const userDetails = async (req, res) => {

    let userDetails
    const cookies = req.headers.cookie
    const token = req.cookies.authToken

    if (!token) {
        return res
            .status(404)
            .json({ status: false })
    }

    jwt.verify(token, String(variables.jwt_secret), async (err, user) => {
        if (err) {
            console.log("error in verifying token!!")
            return res
                .status(400)
                .json({ status: false, token: "Cannot verify token!" })
        }

        let currentUser
        try {
            currentUser = await User.findOne({ _id: user._id }).exec()
        } catch (err) {
            console.log(err)
            return res
                .status(500)
                .json({error: "Internal server error!"})
        }

        return res
            .status(200)
            .json(currentUser)
    })
}

module.exports = userDetails