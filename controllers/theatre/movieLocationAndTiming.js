const Theatre = require("../../models/theatre")

const movieLocationAndTiming = async (req, res) => {
    const { movieName } = req.body

    let data
    try {
        data = await Theatre.aggregate([
            {
                $match: {
                    'movieInfo.movieName': movieName
                }
            },
            {
                $unwind: '$movieInfo'
            },
            {
                $match: {
                    'movieInfo.movieName': movieName
                }
            },
            {
                $project: {
                    location: 1,
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

    
}

module.exports = movieLocationAndTiming