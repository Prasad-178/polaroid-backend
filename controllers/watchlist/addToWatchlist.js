const getMovieById = require("../../api/getMovieById")
const user = require("../../models/user")
const session = require("../../session/session")

const addToWatchlist = async (item) => {
    let existingUser
    try {
        existingUser = await user.findOne({ email: session.email }).exec()
    } catch (err) {
        console.log(err)
    }

    if (!existingUser) {
        console.log("No such user exists!")
        return
    }

    for (let i=0; i<existingUser.planToWatch.length; i++) {
        if (existingUser.planToWatch[i].id === item) {
            return
        }
    }

    const movieData = await getMovieById(item)
    existingUser.planToWatch.push({
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

module.exports = addToWatchlist