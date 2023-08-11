const user = require("../../models/user")
const session = require("../../session/session")

const removeFromWatchlist = async (item) => {
    let existingUser
    try {
        existingUser = await user.findOne({ email: session.email }).exec()
    } catch (err) {
        console.log(err)
    }

    if (!existingUser) {
        console.log("No such user exists!")
        return
    }

    existingUser.planToWatch = existingUser.planToWatch.filter((x) => {
        return x.id!==item
    })

    try {
        await existingUser.save()
    } catch (err) {
        console.log(err)
    }

    return
}

module.exports = removeFromWatchlist