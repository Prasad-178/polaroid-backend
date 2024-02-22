const Theatre = require("../../models/theatre")

const deleteShow = async (req, res) => {
    const { location, movieName, timing } = req.body
    console.log(req.body)

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
        console.log("inside movieInfo array")
        if (loc.movieInfo[i].movieName === movieName) {
            console.log("found movie")
            loc.movieInfo[i].timings = loc.movieInfo[i].timings.filter((x) => {
                return x.timing !== timing
            })
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