const Theatre = require("../../models/theatre")

const ongoingShows = async (req, res) => {
    const currentDate = new Date()

    let movies
    try {
        movies = await Theatre.find({'movieInfo.timings.startTiming': { $gte: currentDate }})
    } catch (err) {
        console.log(err)
    }

    return res
        .status(200)
        .json(movies)
}

module.exports = ongoingShows