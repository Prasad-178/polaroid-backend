const Theatre = require('../../models/theatre')

const getSeats = async (req, res) => {
    const { id, timing, venue } = req.params
    console.log(id, timing, venue)
    venue = venue.split("%20").join(" ").trim()
    id = id.trim()
    let theatre
    try {
        theatre = await Theatre.find({  }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({error: "Internal server error!"})
    }

    console.log(theatre)

    let finalSeats = null
    let flag = false

    for (let i=0; i<theatre.length; i++) {
        if (theatre[i].location === venue) {
            for (let j=0; j<theatre[i].movieInfo.length; j++) {
                if (theatre[i].movieInfo[j].movieName === id) {
                    for (let k=0; k<theatre[i].movieInfo[j].timings.length; k++) {
                        if (theatre[i].movieInfo[j].timings[k].timing === timing) {
                            let seats = theatre[i].movieInfo[j].timings[k].seating
                            finalSeats = seats
                            flag = true
                        }
                        if (flag===true) break;
                    }
                }
                if (flag===true) break
            }
        }
        if (flag===true) break
    }

    return res
        .status(200)
        .json(finalSeats)
}

module.exports = getSeats