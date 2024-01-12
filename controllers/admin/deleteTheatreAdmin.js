const theatreAdmin = require("../../models/theatreAdmin")

const deleteUser = async (req, res) => {
    const { username } = req.body

    let delUser
    try {
        delUser = await theatreAdmin.deleteOne({ username: username }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Internal error occurred!" })
    }

    return res
        .status(200)
        .json({ message: "Theatre admin deleted successfully!" })
}

module.exports = deleteUser