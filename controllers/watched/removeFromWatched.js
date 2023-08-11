const User = require("../../models/user")
const session = require("../../session/session")

const removeFromWatched = async (item) => {
    let existingUser
    try {
        existingUser = await User.findOne({ email: session.email }).exec()
    } catch (err) {
        console.log(err)
    }

    console.log(existingUser)
    if (!existingUser) {
        console.log("No such user exists!")
        return
    }

    console.log(existingUser.watched[0].id, item)
    existingUser.watched = existingUser.watched.filter((x) => {
        return x.id !== item
    })

    try {
        await existingUser.save()
    } catch (err) {
        console.log("hi")
        console.log(err)
    }

    return
}

module.exports = removeFromWatched