const getMovieById = require("../../api/getMovieById")
const user = require("../../models/user")
const session = require("../../session/session")

const addToFavourites = async (item) => {
    let existingUser
    try {
        existingUser = await user.findOne({ email: session.email }).exec()
    } catch (err) {
        console.log(err)
        return
    }

    for (let i=0; i<existingUser.favourites.length; i++) {
        if (existingUser.favourites[i].id===item) return
    }

    if (existingUser.favourites.length >= 5) {
        console.log("Favourites list is full, cannot add any more items!")
        return
    }

    const movieData = await getMovieById(item)
    existingUser.favourites.push({
        id: item,
        poster_path: movieData.poster_path
    })

    try {
        await existingUser.save()
    } catch (err) {
        console.log(err)
        return
    }

    return
}

module.exports = addToFavourites