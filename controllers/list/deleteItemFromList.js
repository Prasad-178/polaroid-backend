const list = require("../../models/list")
const session = require("../../session/session")

const deleteFromList = async (listName, listItem) => {
    // const { listName, listItem } = req.body

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

    // console.log(existingList)

    existingList.items = existingList.items.filter((x) => {
        return x.id !== listItem
    })

    // console.log(existingList)

    try {
        await existingList.save()
    } catch (err) {
        console.log(err)
        return
    }

    return
}

module.exports = deleteFromList
