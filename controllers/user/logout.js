const session = require("../../session/session")

const logout = async (req, res) => {
    session.isLoggedIn = false
    session.email = ""
    session.username = ""

    res.clearCookie('authToken')

    res.status(200).redirect('/user/login')
}

module.exports = logout