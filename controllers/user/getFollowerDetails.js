const User = require('../../models/user')

const getFollowerDetails = async (req, res) => {
    const { username } = req.params

    let existingUser
    try {
        existingUser = await User.findOne({ username: username }).exec()
    } catch (err) {
        console.log(err)
    }

    let followerIDs = []
    for (let i=0; i<existingUser.followers.length; i++) {
        followerIDs.push(existingUser.followers[i])
    }

    let data = []
    for (let i=0; i<followerIDs.length; i++) {
        let follower
        try {
            follower = await User.findOne({ email: followerIDs[i] }).exec()
        } catch (err) {
            console.log(err)
            return res
                .status(500)
                .json({ error: "Internal error occurred!" })
        }
        data.push({
        username: follower.username,
        followers: follower.followers.length,
        following: follower.following.length,
        watched: follower.watched.length,
        favourites: follower.favourites.length
        })
    }

    return res
        .status(200)
        .json(data)
}

module.exports = getFollowerDetails