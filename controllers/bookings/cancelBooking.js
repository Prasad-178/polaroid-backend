const Ticket = require("../../models/ticket")
const Theatre = require("../../models/theatre")

const cancelBooking = async (req, res) => {
    let { email, movieName, runDate, startTiming, endTiming, ticketNumbers, location } = req.body
    console.log(req.body)

    for (let i=0; i<ticketNumbers.length; i++) {
        ticketNumbers[i][1] = ticketNumbers[i][1] - 1
    }

    console.log(ticketNumbers)
    
    startTiming = new Date(startTiming)
    endTiming = new Date(endTiming)
    runDate = new Date(runDate)
    
    let movie
    try {
        movie = await Theatre.findOne({ location: location }).exec()
    } catch (err) {
        console.log(err)
    }

    if (!movie) {
        return res
            .status(404)
            .json({ error: "No such movie exists!" })
    }

    for (let i=0; i<movie.movieInfo.length; i++) {
        if (movie.movieInfo[i].movieName === movieName) {
            console.log("found moviename")
            for (let j=0; j<movie.movieInfo[i].timings.length; j++) {
                // const curmovie = movie.movieInfo[i].timings[j]
                console.log(movie.movieInfo[i].timings[j].runDate, runDate)
                if (movie.movieInfo[i].timings[j].runDate.getTime() === runDate.getTime() && movie.movieInfo[i].timings[j].startTiming.getTime() === startTiming.getTime() && movie.movieInfo[i].timings[j].endTiming.getTime() === endTiming.getTime()) {
                    console.log("found exact timing!")
                    for (let k=0; k<ticketNumbers.length; k++) {
                        console.log(ticketNumbers[k])
                        console.log(movie.movieInfo[i].timings[j].seating[ticketNumbers[k][0]][ticketNumbers[k][1]])
                        movie.movieInfo[i].timings[j].seating[ticketNumbers[k][0]][ticketNumbers[k][1]] = 1
                    }
                }
            }
        }
    }

    try {
        await Theatre.updateOne({location: location}, movie)
    } catch (err) {
        console.log("movie update err")
        console.log(err)
        return res
            .status(500)
            .json({ error: "Some internal error occurred!" })
    }

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