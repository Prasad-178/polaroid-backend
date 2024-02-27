const Ticket = require("../../models/ticket")
const Theatre = require("../../models/theatre")

const cancelBooking = async (req, res) => {
    let { email, movieName, runDate, startTiming, endTiming, ticketNumbers, location } = req.body
    
    startTiming = new Date(startTiming)
    endTiming = new Date(endTiming)
    runDate = new Date(runDate)
    
    let movie
    try {
        movie = await Theatre.findOne({
            location,
            'movieInfo.movieName': movieName,
            'movieInfo.timings.runDate': runDate
        })
    } catch (err) {
        console.log(err)
    }

    if (!movie) {
        return res
            .status(404)
            .json({ error: "No such movie exists!" })
    }

    for (let i=0; i<ticketNumbers.length; i++) {
        console.log(ticketNumbers[i])
        console.log(movie.movieInfo[0].timings[0].seating[ticketNumbers[i][0]][ticketNumbers[i][1]])
        movie.movieInfo[0].timings[0].seating[ticketNumbers[i][0]][ticketNumbers[i][1]] = 1
    }

    let updatedMovie
    try {
        updatedMovie = await Theatre.findOneAndUpdate({
            location,
            'movieInfo.movieName': movieName,
            'movieInfo.timings.runDate': runDate
        },
        { $set: movie },
        { new: true }
        )
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({ error: "Internal error occurred" })
    }

    console.log(updatedMovie)

    let bookedTicket
    try {
        bookedTicket = await Ticket.deleteOne({ email: email, movieName: movieName, startTiming: startTiming, endTiming: endTiming, location: location, runDate: runDate, ticketNumbers: ticketNumbers }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Internal error occurred!" })
    }

    console.log("done!")
    return res
        .status(200)
        .json({ message: "Ticket cancelled successfully!" })
}

module.exports = cancelBooking