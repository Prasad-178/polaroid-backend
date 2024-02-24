const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const variables = require('../../config')
const session = require('../../session/session')

const login = async (req, res) => {
    const { email, password } = req.body
    let existingUser
    try {
        existingUser = await User.findOne({ email: email }).exec()
    } catch (err) {
        console.log("Internal server error!")
        // res.render('login', { error: "Internal Server Error!" })
        // return
        return res
            .status(500)
            .send({
                error: "Internal server error!"
            })
    }

    if (!existingUser) {
        // res.render('login', { error: "No such user exists!" })
        // return
        return res
            .status(404)
            .json({
                error: "No such user exists!"
            })
    }

    const passwordCheck = bcrypt.compareSync(password, existingUser.password)

    if (!passwordCheck) {
        // res.render('login', { error: "The password you have entered is wrong!" })
        // return
        return res
            .status(403)
            .json({
                error: "The password you have entered is wrong!"
            })
    }

    const token = jwt.sign({_id: existingUser._id}, variables.jwt_secret, {
        expiresIn: '3h'
    })

    res.cookie('authToken', token, {
        path: '/',
        expires: new Date(Date.now() + 1000*60*60*168),
        httpOnly: true,
        sameSite: 'lax'
    })

    session.isLoggedIn = true
    session.email = existingUser.email
    session.username = existingUser.username
    return res
        .status(200)
        .json(existingUser);
}

module.exports = login