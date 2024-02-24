const Theatre = require("../../models/theatre")

const movieLocationAndTiming = async (req, res) => {
    const { movieName } = req.params

    const currentDate = new Date()

    let data
    try {
        data = await Theatre.aggregate([
            {
                $unwind: '$movieInfo'
            },
            {
                $match: {
                    'movieInfo.movieName': movieName
                }
            },
            {
                $unwind: '$movieInfo.timings'
            },
            {
                $match: {
                    'movieInfo.timings.startTiming': { $gte: currentDate }
                }
            },
            {
                $project: {
                    _id: 0,
                    location: '$location',
                    timings: '$movieInfo.timings'
                }
            }
        ])
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({error: "Some internal error occurred!"})
    }

    return res
        .status(200)
        .json(data)
}

module.exports = movieLocationAndTiming