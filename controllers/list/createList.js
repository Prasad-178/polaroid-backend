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
        // console.log(err)
        // return
        return res  
            .status(500)
            .json({ 
                error: "Internal server error!"
             })
    }

    if (existingList) {
        // console.log("A list with this name already exists")
        // return
        return res  
            .status(401)
            .json({ 
                error: "A list with this name already exists!"
             })
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
        // console.log(err)
        // return
        return res  
            .status(500)
            .json({ 
                error: "Internal server error!"
             })
    }

    // res.redirect('/user/list')
    return res  
            .status(200)
            .json({ 
                error: "List created successfully!"
             })
}

module.exports = createList