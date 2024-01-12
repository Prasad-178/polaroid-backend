const List = require('../../models/list')

const getMyListByName = async (req, res) => {

    const { listName } = req.body

    let list
    try {
        list = await List.findOne({ listName: listName }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Internal error occurred!" })
    }

    if (!list) {
        console.log("No such list exists!!")
        return res
            .status(404)
            .json({ message: "No such list exists!" })
    }

    return res  
        .status(200)
        .json(list)
}

module.exports = getMyListByName