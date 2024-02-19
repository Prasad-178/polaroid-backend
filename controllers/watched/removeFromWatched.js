const User = require("../../models/user")

const removeFromWatched = async (req, res) => {
    const item = req.params.id
    const {email} = req.body

    console.log(email, item)

    let existingUser
    try {
        existingUser = await User.findOne({ email: email }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({error: "Internal server error!"})
    }

    console.log(existingUser)
    if (!existingUser) {
        console.log("No such user exists!")
        return res
            .status(404)
            .json({ error: "No such user exists!" })
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
        return res
            .status(500)
            .json({error: "Internal server error!"})
    }

    return res
        .status(200)
        .json({message: "Removed film from watched successfully!"})
}

module.exports = removeFromWatched