const Theatre = require("../../models/theatre")

const deleteMovie = async (req, res) => {
    const { location, movieName } = req.body

    let loc
    try {
        loc = await Theatre.findOne({ location: location }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Internal error occurred!" })
    }

    loc.movieInfo = loc.movieInfo.filter((x) => {
        return x.movieName !== movieName
    })

    try {
        await loc.save()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Internal error occurred!" })
    }

    return res
        .status(200)
        .json({ message: "Movie deleted successfully!" })
}

module.exports = deleteMovie