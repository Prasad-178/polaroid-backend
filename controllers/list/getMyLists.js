const List = require("../../models/list")
const session = require("../../session/session")

const getMyLists = async () => {
    let lists
    try {
        lists = await List.find({ createdBy: session.username }).exec()
    } catch (err) {
        console.log(err)
    }

    return lists
}

module.exports = getMyLists