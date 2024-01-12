const User = require('../../models/user')
const List = require('../../models/list')

const getFollowingDetails = async (req, res) => {

    const { username } = req.params

    let existingUser
    try {
        existingUser = await User.findOne({ username: username }).exec()
    } catch (err) {
        console.log(err)
    }

    let followingIDs = []
    for (let i=0; i<existingUser.following.length; i++) {
        followingIDs.push(existingUser.following[i])
    }

    let lists
    try {
        lists = await List.find({ createdBy: username })
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Internal error occurred!" })
    }

    let data = []
    for (let i=0; i<followingIDs.length; i++) {
        let following
        try {
            following = await User.findOne({ email: followingIDs[i] }).exec()
        } catch (err) {
            console.log(err)
            return res
                .status(500)
                .json({ error: "Internal error occurred!" })
        }
        data.push({
            username: following.username,
            followers: following.followers.length,
            following: following.following.length,
            watched: following.watched.length,
            favourite: following.favourites.length,
            lists: lists.length
        })
    }

    return res
        .status(200)
        .json(data)
}

module.exports = getFollowingDetails