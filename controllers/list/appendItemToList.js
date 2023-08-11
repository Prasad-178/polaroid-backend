const getMovieById = require('../../api/getMovieById')
const List = require('../../models/list')
const session = require('../../session/session')

const appendToList = async (listName, listItem) => {

    let existingList
    try {
        existingList = await List.findOne({ listName: listName, createdBy: session.username }).exec()
    } catch (err) {
        console.log(err)
    }

    if (!existingList) {
        console.log("No such list exists!")
        return
    }

    for (let i=0; i<existingList.items.length; i++) {
        if (existingList.items[i].id === listItem) {
            return
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
        return
    }

    return
}

module.exports = appendToList