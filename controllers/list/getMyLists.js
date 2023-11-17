const List = require("../../models/list")
const session = require("../../session/session")

const getMyLists = async (req, res) => {
    const {username} = req.body
    let lists
    try {
        lists = await List.find({ createdBy: username }).exec()
    } catch (err) {
        console.log(err)
    }

    return res
        .status(200)
        .json(lists)
}

module.exports = getMyLists