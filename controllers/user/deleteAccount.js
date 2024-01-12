const User = require('../../models/user')

const deleteAccount = async (req, res) => {
    const { email } = req.body
    try {
        await User.findOneAndDelete({ email: email }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Internal error occurred!" })
    }

    return res
        .status(200)
        .json({ message: "Account deleted successfully!" })
}

module.exports = deleteAccount