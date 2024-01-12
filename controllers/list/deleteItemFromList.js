const list = require("../../models/list")

const deleteFromList = async (req, res) => {
    const { username, listName, listItem } = req.body

    let existingList
    try {
        existingList = await list.findOne({ createdBy: username, listName: listName }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Internal error occurred!" })
    }

    if (!existingList) {
        console.log("No such list exists!")
        return res  
            .status(404)
            .json({ error: "No such list exists!" })
    }

    existingList.items = existingList.items.filter((x) => {
        return x.id !== listItem
    })

    try {
        await existingList.save()
    } catch (err) {
        console.log(err)
        return res  
            .status(500)
            .json({ error: "Internal error occurred!" })
    }

    return res
        .status(200)
        .json({ message: "Item deleted from list successfully!" })
}

module.exports = deleteFromList
