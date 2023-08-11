const List = require('../../models/list')

const getRecentLists = async () => {
    let lists
    try {
        lists = await List.find({  }).limit(10).exec()
    } catch (err) {
        console.log(err)
    }

    return lists
}

module.exports = getRecentLists