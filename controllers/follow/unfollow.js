const user = require("../../models/user")
const session = require("../../session/session")

const unFollow = async (req, res) => {
    const username = req.params.name.split("%20").join(" ") 

    let existingUser
    try {
        existingUser = await user.findOne({ email: session.email }).exec()
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
    
    let otherUser
    try {
        otherUser = await user.findOne({ username: username }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Internal server error!" })
    }
    
    existingUser.following = existingUser.following.filter((x) => {
        return x!==otherUser.email
    })
    otherUser.followers = otherUser.followers.filter((x) => {
        return x!==session.email
    })

    try {
        await existingUser.save()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Internal server error!" })
    }

    try {
        await otherUser.save()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Internal server error!" })
    }

    // res.redirect('/profile/'+username.split(" ").join("%20"))
    return res
        .status(200)
        .json({ message: "Unfollowed user successfully!" })
}

module.exports = unFollow