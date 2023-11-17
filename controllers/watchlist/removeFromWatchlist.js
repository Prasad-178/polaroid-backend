const user = require("../../models/user")
const session = require("../../session/session")

const removeFromWatchlist = async (req, res) => {
    const item = req.params.id
    const {email} = req.body
    let existingUser
    try {
        existingUser = await user.findOne({ email: email }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Internal server error!" })
    }

    if (!existingUser) {
        console.log("No such user exists!")
        return res
            .status(404)
            .json({ error: "No such user exists!" })
    }

    existingUser.planToWatch = existingUser.planToWatch.filter((x) => {
        return x.id!==item
    })

    try {
        await existingUser.save()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Internal server error!" })
    }

    return res
        .status(500)
        .json({ error: "Internal server error!" })
}

module.exports = removeFromWatchlist