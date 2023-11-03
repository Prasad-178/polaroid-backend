const getMovieById = require("../../api/getMovieById")
const user = require("../../models/user")
const session = require("../../session/session")

const addToWatched = async (req, res) => {
    const item = req.params.id
    let existingUser
    try {
        existingUser = await user.findOne({ email: session.email }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({error: "Internal server error!"})
    }

    for (let i=0; i<existingUser.watched.length; i++) {
        if (existingUser.watched[i].id===item) return
    }

    if (!existingUser) {
        console.log("No such user exists!")
        return res
            .status(404)
            .json({error: "No such user exists!"})
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
        return res
            .status(500)
            .json({ error: "Internal server error!" })
    }

    return res
        .status(200)
        .json({ message: "Added film to watched successfully!" })
}

module.exports = addToWatched