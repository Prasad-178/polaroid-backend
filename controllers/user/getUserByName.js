const User = require('../../models/user')
const List = require('../../models/list')

const getUserByName = async (req, res) => {
    const { name } = req.body
    let user
    try {
        user = await User.findOne({ username: name }).exec()
    } catch (err) {
        console.log(err)
    }

    let lists
    try {
        lists = await List.find({ createdBy: name }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Internal error occurred!" })
    }

    let data = {}
    data.user = user
    data.listLength = lists.length

    return res
        .status(200)
        .json(data)
}

module.exports = getUserByName