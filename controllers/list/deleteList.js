const list = require("../../models/list")
const user = require("../../models/user")

const deleteList = async (req, res) => {

    const { username, listName } = req.body

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
    
    try {
        await existingList.delete()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Internal error occurred!" })
    }

    return res
        .status(200)
        .json({ message: "List deleted successfully!" })
}

module.exports = deleteList