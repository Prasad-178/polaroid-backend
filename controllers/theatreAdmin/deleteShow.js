const Theatre = require("../../models/theatre")

const deleteShow = async (req, res) => {
    let { location, movieName, startTiming, endTiming, runDate } = req.body
    console.log(req.body)

    let startTimingObject = new Date(startTiming)
    let endTimingObject = new Date(endTiming)
    let runDateObject = new Date(runDate)

    console.log(startTiming, endTiming, runDate)

    let loc
    try {
        loc = await Theatre.findOne({ location: location }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Internal error occurred!" })
    }

    for (let i=0; i<loc?.movieInfo?.length; i++) {
        if (loc.movieInfo[i].movieName === movieName) {
            let newTimings = []
            for (let j=0; j<loc.movieInfo[i].timings.length; j++) {
                const x = loc.movieInfo[i].timings[j]
                if (x.startTiming - startTimingObject === 0 && x.endTiming - endTimingObject === 0 && x.runDate - runDateObject === 0) {
                    console.log("found movie to delete, not pushing!")
                }
                else {
                    newTimings.push(loc.movieInfo[i].timings[j])
                }
            }
            loc.movieInfo[i].timings = newTimings
        }
    }

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
        .json({ message: "Show deleted successfully!" })
}

module.exports = deleteShow