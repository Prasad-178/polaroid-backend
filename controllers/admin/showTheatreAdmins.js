const theatreAdmin = require("../../models/theatreAdmin")

const showUsers = async (req, res) => {
    let users
    try {
        users = await theatreAdmin.find({}).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Internal server error!" })
    }

    return res
        .status(200)
        .json(users)
}

module.exports = showUsers