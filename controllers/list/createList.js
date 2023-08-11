const List = require('../../models/list')
const session = require('../../session/session')

const createList = async (req, res) => {
    const { listName, description } = req.body
    const createdBy = session.username
    const createdAt = new Date(Date.now())

    let existingList
    try {
        existingList = await List.findOne({ createdBy: createdBy, listName: listName }).exec()
    } catch (err) {
        console.log(err)
        return
    }

    if (existingList) {
        console.log("A list with this name already exists")
        return
    }

    const newList = new List({
        listName: listName,
        description: description,
        createdBy: createdBy,
        createdAt: createdAt,
        items: []
    })

    try {
        await newList.save()
    } catch (err) {
        console.log(err)
        return
    }

    res.redirect('/user/list')
}

module.exports = createList