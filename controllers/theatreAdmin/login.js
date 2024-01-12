const bcrypt = require("bcryptjs")
const theatreAdmin = require("../../models/theatreAdmin")
const jwt = require('jsonwebtoken')
const variables = require("../../config")
const session = require("../../session/session")

const login = async (req, res) => {
    const { username, password } = req.body

    let existingUser
    try {
        existingUser = await theatreAdmin.findOne({ username: username }).exec()
    } catch (err) {
        console.log("Internal server error!")
        return res
            .status(500)
            .send({
                error: "Internal server error!"
            })
    }

    if (!existingUser) {
        return res
            .status(404)
            .json({
                error: "No such theatre admin exists!"
            })
    }

    const passwordCheck = bcrypt.compareSync(password, existingUser.password)

    if (!passwordCheck) {
        return res
            .status(403)
            .json({
                error: "The password you have entered is wrong!"
            })
    }

    return res  
        .status(200)
        .json({ message: "Logged in as theatre admin successfully!" })
}

module.exports = login