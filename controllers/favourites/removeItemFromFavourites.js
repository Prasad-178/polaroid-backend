const user = require("../../models/user")
const session = require("../../session/session")

const removeFromFavourites = async (req, res) => {
    const item = req.params.id
    let existingUser
    try {
        existingUser = await user.findOne({ email: session.email }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Internal server error!" })
    }

    existingUser.favourites = existingUser.favourites.filter((x) => {
        return x.id !== item
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
        .status(200)
        .json({ message: "Removed item from favourites successfully!" })
}

module.exports = removeFromFavourites