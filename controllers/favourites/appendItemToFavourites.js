const getMovieById = require("../../api/getMovieById")
const user = require("../../models/user")
const session = require("../../session/session")

const addToFavourites = async (req, res) => {
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

    for (let i=0; i<existingUser.favourites.length; i++) {
        if (existingUser.favourites[i].id===item) return
    }

    if (existingUser.favourites.length >= 5) {
        console.log("Favourites list is full, cannot add any more items!")
        return res
            .status(401)
            .json({ error: "Favourites list is full, cannot add any more items!" })
    }

    const movieData = await getMovieById(item)
    console.log(movieData)
    if (movieData == undefined) {
        console.log('undefined movie data')
        return res
            .status(500)
            .json({error: "Some internal error occurred!"})
    }
    
    existingUser.favourites.push({
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
        .json({ message: "Added item to favourites successfully!" })
}

module.exports = addToFavourites