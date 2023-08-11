const List = require('../../models/list')

const getMyListByName = async (listName) => {
    let list
    try {
        list = await List.findOne({ listName: listName }).exec()
    } catch (err) {
        console.log(err)
    }

    if (!list) {
        console.log("No such list exists!!")
        return
    }

    return list
}

module.exports = getMyListByName