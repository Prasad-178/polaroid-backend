const getMovieById = require("../../api/getMovieById")
const user = require("../../models/user")
const session = require("../../session/session")

const addToWatchlist = async (req, res) => {
    const item = req.params.id
    const {email} = req.body
    let existingUser
    try {
        existingUser = await user.findOne({ email: email }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Internal server error!" })
    }

    if (!existingUser) {
        console.log("No such user exists!")
        return res
            .status(500)
            .json({ error: "Internal server error!" })
    }

    for (let i=0; i<existingUser.planToWatch.length; i++) {
        if (existingUser.planToWatch[i].id === item) {
            return res
                .status(403)
                .json({ error: "Item already present in watchlist!" })
        }
    }

    const movieData = await getMovieById(item)
    console.log(movieData)
    if (movieData == undefined) {
        console.log('undefined movie data')
        return res
            .status(500)
            .json({error: "Some internal error occurred!"})
    }

    existingUser.planToWatch.push({
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
        .json({ message: "Added item to watchlist successfully!" })
}

module.exports = addToWatchlist