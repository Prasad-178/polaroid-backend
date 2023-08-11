const list = require("../../models/list")
const user = require("../../models/user")
const session = require("../../session/session")

const deleteList = async (listName) => {
    let existingList
    try {
        existingList = await list.findOne({ createdBy: session.username, listName: listName }).exec()
    } catch (err) {
        console.log(err)
        return
    }

    if (!existingList) {
        console.log("No such list exists!")
        return
    }
    
    try {
        await existingList.delete()
    } catch (err) {
        console.log(err)
        return
    }

    return
}

module.exports = deleteList