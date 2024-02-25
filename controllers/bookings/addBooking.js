const Theatre = require('../../models/theatre')
const Ticket = require("../../models/ticket")
const nodemailer = require('nodemailer')
const variables = require('../../config')
const getMovieById = require('../../api/getMovieById')

const addBooking = async (req, res) => {
    let { ticketNumbers, movieName, customerName, customerEmail, runDate, startTiming, endTiming, location, email } = req.body

    const movieDetails = await getMovieById(movieName)
    let theatre
    try {
        theatre = await Theatre.findOne({ location: location }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({error: "Internal server error!"})
    }

    for (let j=0; j<theatre.movieInfo.length; j++) {
        if (theatre.movieInfo[j].movieName === movieName) {
            for (let k=0; k<theatre.movieInfo[j].timings.length; k++) {
                if (theatre.movieInfo[j].timings[k].startTiming.getTime() === startTiming.getTime() && theatre.movieInfo[j].timings[k].runDate.getDate() === runDate.getDate() && theatre.movieInfo[j].timings[k].endTiming.getTime() === endTiming.getTime()) {
                    let seatingArrangement = theatre.movieInfo[j].timings[k].seating
                    for (let i=0; i<ticketNumbers.length; i++) {
                        seatingArrangement[ticketNumbers[i][0]][ticketNumbers[i][1]]
                    }
                }
            }
        }
    }

    try {
        await Theatre.findOneAndUpdate({ location: location }, theatre)
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({error: "Internal server error!"})
    }

    let newTicket = new Ticket({
        customerName: customerName,
        customerEmail: customerEmail,
        email: email,
        movieName: movieName,
        ticketNumbers: ticketNumbers,
        runDate: runDate,
        startTiming: startTiming,
        endTiming: endTiming
    })

    try {
        await newTicket.save()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Some internal error occurred!" })
    }

    const html = 
    `
        <div style="display: 'flex', flex-direction: 'column', justify-content: 'center', align-items: 'center'">
            <h1>Your Booking Details for ` + movieDetails.title + ` at ` + location + ` </h1>
            <p style="color: 'lightblue'"> + ` + "Seats Booked : " + ticketNumbers + ` </p>
            <p style="color: 'lightblue'"> + ` + "Movie Time : " + movieTime.split("_").join(" ") + ` </p>
            Polaroid Limited.
        </div>
    `

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "polaroid.email.ltd@gmail.com",
            pass: variables.app_password
        }
    })
    
    let mailOptions = {
        from: "polaroid.email.ltd@gmail.com",
        to: email,
        subject: "Thank you for Booking With Polaroid",
        html: html
    }

    transporter.sendMail(mailOptions, (err, success) => {
        if (err) {
            console.log(err)
            return res
                .status(500)
                .json({error: "Internal server error!"})
        }
        else {
            console.log("Success, email has been sent.")
        }
    })

    return res
        .status(200)
        .json({message: "Ticket booked successfully!"})
}

module.exports = addBooking