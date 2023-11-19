const session = require("../../session/session")

const logout = async (req, res) => {
    session.isLoggedIn = false
    session.email = ""
    session.username = ""

    req.id = ""
    req.status = ""

    res.clearCookie('authToken')

    return res
        .status(200)
        .json({message: "Logged out successfully!"})
}

module.exports = logout