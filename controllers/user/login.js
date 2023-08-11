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
        res.render('login', { error: "Internal Server Error!" })
        return
    }

    if (!existingUser) {
        res.render('login', { error: "No such user exists!" })
        return
    }

    const passwordCheck = bcrypt.compareSync(password, existingUser.password)

    if (!passwordCheck) {
        res.render('login', { error: "The password you have entered is wrong!" })
        return
    }

    const token = jwt.sign({_id: existingUser._id}, variables.jwt_secret, {
        expiresIn: '3h'
    })

    res.cookie('authToken', token, {
        path: '/',
        expires: new Date(Date.now() + 1000*60*60*3),
        httpOnly: true,
        sameSite: 'lax'
    })

    session.isLoggedIn = true
    session.email = existingUser.email
    session.username = existingUser.username

    res.status(200).redirect('/')
}

module.exports = login