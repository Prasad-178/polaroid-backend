const getMovieById = require("../../api/getMovieById")
const user = require("../../models/user")
const session = require("../../session/session")

const addToWatched = async (item) => {
    let existingUser
    try {
        existingUser = await user.findOne({ email: session.email }).exec()
    } catch (err) {
        console.log(err)
    }

    for (let i=0; i<existingUser.watched.length; i++) {
        if (existingUser.watched[i].id===item) return
    }

    if (!existingUser) {
        console.log("No such user exists!")
        return
    }

    const movieData = await getMovieById(item)
    existingUser.watched.push({
        id: item,
        poster_path: movieData.poster_path
    })

    try {
        await existingUser.save()
    } catch (err) {
        console.log(err)
    }

    return
}

module.exports = addToWatched