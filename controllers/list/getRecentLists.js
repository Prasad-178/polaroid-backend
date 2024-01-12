const List = require('../../models/list')

const getRecentLists = async (req, res) => {
    let lists
    try {
        lists = await List.find({  }).limit(10).exec()
    } catch (err) {
        console.log(err)
    }

    return res  
        .status(200)
        .json(lists)
}

module.exports = getRecentLists