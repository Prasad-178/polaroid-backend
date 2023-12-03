const User = require('../../models/user')
const List = require('../../models/list')
const session = require('../../session/session')

const getUser = async (req, res) => {
    console.log(req.body)
    const { username } = req.body
    let user
    try {
        user = await User.findOne({ username: username }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Internal server error!" })
    }

    let lists = await List.find({ createdBy: session.username }).exec()

    let data = {}
    data.user = user
    data.lists = lists.length
    console.log(data)

    return res
        .status(200)
        .json(data)
}

module.exports = getUser