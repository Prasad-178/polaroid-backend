const getMovieById = require('../../api/getMovieById')
const List = require('../../models/list')
const session = require('../../session/session')

const appendToList = async (req, res) => {
    const {listItem, listName} = req.body

    let existingList
    try {
        existingList = await List.findOne({ listName: listName, createdBy: session.username }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({error: "Internal server error!"})
    }

    if (!existingList) {
        console.log("No such list exists!")
        return res
            .status(404)
            .json({error: "No such list exists!"})
    }

    for (let i=0; i<existingList.items.length; i++) {
        if (existingList.items[i].id === listItem) {
            return res
                .status(200)
                .json({ message: "Movie is already in list!" })
        }
    }

    const movieData = await getMovieById(listItem)
    const poster_path = movieData.poster_path

    existingList.items.push({
        id: listItem,
        poster_path: poster_path
    })

    console.log(existingList.items)

    try {
        existingList.save() 
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({error: "Internal server error!"})
    }

    return res
        .status(200)
        .json({message: "Movie added to list successfully!"})
}

module.exports = appendToList