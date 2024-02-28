const Theatre = require('../../models/theatre')
const Ticket = require("../../models/ticket")
const nodemailer = require('nodemailer')
const variables = require('../../config')
const getMovieById = require('../../api/getMovieById')

const ticketMapping = {
    9: 'A',
    8: 'B',
    7: 'C',
    6: 'D',
    5: 'E',
    4: 'F',
    3: 'G',
    2: 'H',
    1: 'I',
    0: 'J'
}

const mapTicketsToString = (ticketsArray) => {
    let str = ""
    for (let i=0; i<ticketsArray.length; i++) {
        ticketsArray[i][1] = ticketsArray[i][1] + 1
        if (i !== ticketsArray.length - 1) {
            str += "" + ticketMapping[ticketsArray[i][0]] + ticketsArray[i][1] + ", "
        }
        else {
            str += "" + ticketMapping[ticketsArray[i][0]] + ticketsArray[i][1]
        }
    }

    return str
}

const addBooking = async (req, res) => {
    let { ticketNumbers, movieName, customerName, customerEmail, runDate, startTiming, endTiming, location, email, dateString } = req.body

    startTiming = new Date(startTiming)
    endTiming = new Date(endTiming)
    runDate = new Date(runDate)

    const movieDetails = await getMovieById(movieName)
    let theatre
    try {
        theatre = await Theatre.findOne({ location: location }).exec()
    } catch (err) {
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
                        seatingArrangement[ticketNumbers[i][0]][ticketNumbers[i][1]] = 0
                    }
                }
            }
        }
    }

    let newTicket = new Ticket({
        customerName: customerName,
        customerEmail: customerEmail,
        email: email,
        movieName: movieName,
        ticketNumbers: ticketNumbers,
        runDate: runDate,
        startTiming: startTiming,
        endTiming: endTiming,
        location: location
    })

    try {
        await Theatre.findOneAndUpdate({ location: location }, theatre)
    } catch (err) {
        return res
            .status(500)
            .json({error: "Internal server error!"})
    }

    try {
        await newTicket.save()
    } catch (err) {
        return res
            .status(500)
            .json({ error: "Some internal error occurred!" })
    }

    console.log(movieDetails)

    const html = 
    `
        <div style="display: 'flex', flex-direction: 'column', justify-content: 'center', align-items: 'center'">
            <h1>Your Booking Details for ` + movieDetails?.title + ` at ` + location + ` </h1>
            <p style="color: 'lightblue'"> + ` + "Seats Booked : " + mapTicketsToString(ticketNumbers) + ` </p>
            <p style="color: 'lightblue'"> + ` + "Movie Time : " + dateString + ` </p>
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
        to: customerEmail,
        subject: "Thank you for Booking With Polaroid",
        html: html
    }

    transporter.sendMail(mailOptions, (err, success) => {
        if (err) {
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