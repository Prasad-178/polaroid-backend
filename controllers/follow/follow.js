const user = require("../../models/user")
const session = require("../../session/session")

const follow = async (req, res) => {
    const username = req.params.name.split("%20").join(" ") 

    if (!session.isLoggedIn) {
        res.redirect('/user/login')
        return
    } 

    let existingUser
    try {
        existingUser = await user.findOne({ email: session.email }).exec()
    } catch (err) {
        console.log(err)
    }

    if (!existingUser) {
        console.log("No such user exists!")
        res.redirect('/user/login')
    }

    let otherUser
    try {
        otherUser = await user.findOne({ username: username }).exec()
    } catch (err) {
        console.log(err)
    }
    
    existingUser.following.push(otherUser.email)
    otherUser.followers.push(session.email)

    try {
        await existingUser.save()
    } catch (err) {
        console.log(err)
    }

    try {
        await otherUser.save()
    } catch (err) {
        console.log(err)
    }

    res.redirect('/profile/'+username.split(" ").join("%20"))
}

module.exports = follow