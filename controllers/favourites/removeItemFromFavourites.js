const user = require("../../models/user")
const session = require("../../session/session")

const removeFromFavourites = async (item) => {
    let existingUser
    try {
        existingUser = await user.findOne({ email: session.email }).exec()
    } catch (err) {
        console.log(err)
        return
    }

    existingUser.favourites = existingUser.favourites.filter((x) => {
        return x.id !== item
    })

    try {
        await existingUser.save()
    } catch (err) {
        console.log(err)
        return
    }

    return
}

module.exports = removeFromFavourites