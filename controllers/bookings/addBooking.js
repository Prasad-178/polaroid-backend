const Theatre = require('../../models/theatre')
const Booking = require('../../models/booking')
const nodemailer = require('nodemailer')
const variables = require('../../config')
const getMovieById = require('../../api/getMovieById')

const addBooking = async (req, res) => {
    let {seat_list, venue, email, info_array, mobile, person_counter, movieTime, movieId} = req.body
    const movieDetails = await getMovieById(movieId)
    venue = venue.split("%20").join(" ").trim()
    movieId = movieId.trim()
    let theatre
    try {
        theatre = await Theatre.findOne({ location: venue }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({error: "Internal server error!"})
    }
    // console.log(theatre, typeof theatre, theatre.length)

    // theatre = theatre[0]
    let flag = false
    seat_list = seat_list.split(",")

    let seat_string = ""
    for (let i=0; i<seat_list.length; i++) {
      let second = +seat_list[i]%10
      second++
      let first = (Math.floor(seat_list[i]/10))%10
      first = String.fromCharCode(65+first)
      let final_seat = first.toString() + second.toString()
      seat_string += final_seat + ", "
    }

    seat_string = seat_string.slice(0, seat_string.length-2)

    // console.log(seat_string)

    for (let j=0; j<theatre.movieInfo.length; j++) {
        if (theatre.movieInfo[j].movieName === movieId) {
            for (let k=0; k<theatre.movieInfo[j].timings.length; k++) {
                if (theatre.movieInfo[j].timings[k].timing === movieTime) {
                    for (let i=0; i<seat_list.length; i++) {
                        let second = +seat_list[i]%10
                        let first = Math.floor(seat_list[i]/10)
                        theatre.movieInfo[j].timings[k].seating[first][second] = 0
                    }
                }
            }
        }
        if (flag === true) break
    }

    try {
        await Theatre.findOneAndUpdate({ location: venue }, theatre)
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({error: "Internal server error!"})
    }

    const html = 
    `
        <div style="display: 'flex', flex-direction: 'column', justify-content: 'center', align-items: 'center'">
            <h1>Your Booking Details for ` + movieDetails.title + ` at ` + venue + ` </h1>
            <p style="color: 'lightblue'"> + ` + "Seats Booked : " + seat_string + ` </p>
            <p style="color: 'lightblue'"> + ` + "Movie Time : " + movieTime.split("_").join(" ") + ` </p>
            Polaroid Limited. Made by Arka, Prasad, Urjasvi, Biswadip and Kalyan
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
            // console.log("Success, email has been sent.")
        }
    })

    for (let i=0; i<person_counter; i++) {
        let second = +seat_list[i]%10
        let first = Math.floor(seat_list[i]/10)
        info_array = info_array.split("\"")
        let newBooking = new Booking({
            name: info_array[1],
            location: venue,
            movieName: movieId,
            timing: movieTime,
            seatXIndex: first,
            seatYIndex: second  
        })

        try {
            await newBooking.save()
        } catch (err) {
            console.log(err)
            return res
                .status(500)
                .json({error: "Internal server error!"})
        }
    }

    return res
        .status(200)
        .json({message: "Ticket booked successfully!"})
}

module.exports = addBooking