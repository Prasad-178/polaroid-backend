const jwt = require('jsonwebtoken')
const user = require('../../models/user')

const userDetails = async (req, res) => {

    let userDetails
    const cookies = req.headers.cookie
    const token = req.cookies.JWT_HTTPONLY_Cookie

    if (!token) {
        return res
        .status(404)
        .json({ status: false })
    }

    jwt.verify(token, String(process.env.JWT_SECRET_KEY), async (err, user) => {
        if (err) {
            // console.log("error in verifying token!!")
            res
            .status(400)
            .json({ status: false, token: "Cannot verify token!" })
        }

        let currentUser
        try {
            currentUser = await User.findOne({ _id: user.id }).exec()
        } catch (err) {
            console.log(err)
        }

        return res
        .status(200)
        .json(currentUser)
    })
}

module.exports = userDetails