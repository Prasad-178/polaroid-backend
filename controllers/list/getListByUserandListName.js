const List = require("../../models/list")

const getList = async (req, res) => {
    const { username, listName } = req.body
    let list 
    try {
        list = await List.findOne({ createdBy: username, listName: listName }).exec()
    } catch (err) {
        console.log(err)
        return res  
            .status(500)
            .json({ error: "Internal error occurred!" })
    }

    return res  
        .status(200)
        .json(list)
}

module.exports = getList