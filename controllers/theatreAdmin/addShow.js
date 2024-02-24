const theatre = require("../../models/theatre")
const theatreAdmin = require("../../models/theatreAdmin")

const defaultSeating = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]
 
const addShow = async (req, res) => {
    let { adminName, location, movieName, startTime, endTime, runDate, price } = req.body

    let runDate_DateObject = new Date(runDate)
    const [startHours, startMinutes] = startTime.split(":")

    let startTime_DateObject = new Date(
        runDate_DateObject.getFullYear(),
        runDate_DateObject.getMonth(),
        runDate_DateObject.getDate(),
        parseInt(startHours, 10),
        parseInt(startMinutes, 10)
    )

    const [endHours, endMinutes] = endTime.split(":")

    let endTime_DateObject = new Date(
        runDate_DateObject.getFullYear(),
        runDate_DateObject.getMonth(),
        runDate_DateObject.getDate(),
        parseInt(endHours, 10),
        parseInt(endMinutes, 10)
    )

    let movieLoc
    try {
        movieLoc = await theatre.findOne({ location: location }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Internal error occurred!" })
    }


    if (!movieLoc) {
        const newLocation = new theatre({
            location: location,
            movieInfo: []
        })

        let checkMovieName = false
        for (let i=0; i<newLocation.movieInfo.length; i++) {
            if (newLocation.movieInfo[i].movieName === movieName) {
                checkMovieName = true
                break
            }
        }
        if (!checkMovieName) {
            newLocation.movieInfo.push({
                movieName: movieName,
                timings: []
            })
        }

        for (let i=0; i<newLocation.movieInfo.length; i++) {
            if (newLocation.movieInfo[i].movieName === movieName) {
                newLocation.movieInfo[i].timings.push({
                    startTiming: startTime_DateObject,
                    endTiming: endTime_DateObject,
                    runDate: runDate_DateObject,
                    seating: defaultSeating,
                    price: price
                })
                break
            }
        }

        try {
            await newLocation.save()
        } catch (err) {
            console.log(err)
            return res
                .status(500)
                .json({ error: "Internal error occurred!" })
        }
    }
    else {
        let checkMovieName = false
        for (let i=0; i<movieLoc.movieInfo.length; i++) {
            if (movieLoc.movieInfo[i].movieName === movieName) {
                checkMovieName = true
                break
            }
        }
        if (!checkMovieName) {
            movieLoc.movieInfo.push({
                movieName: movieName,
                timings: []
            })
        }

        for (let i=0; i<movieLoc.movieInfo.length; i++) {
            if (movieLoc.movieInfo[i].movieName === movieName) {
                movieLoc.movieInfo[i].timings.push({
                    startTiming: startTime_DateObject,
                    endTiming: endTime_DateObject,
                    runDate: runDate_DateObject,
                    seating: defaultSeating,
                    price: price
                })
                break
            }
        }

        try {
            await movieLoc.save()
        } catch (err) {
            console.log(err)
            return res
                .status(500)
                .json({ error: "Internal error occurred!" })
        }
    }

    let tAdmin
    try {
        tAdmin = await theatreAdmin.findOne({ username: adminName }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({error: "Some internal error occurred!"})
    }

    let present = false
    for (let i=0; i<tAdmin.locations.length; i++) {
        if (tAdmin.locations[i] === location) {
            present = true
            break
        }
    }

    if (!present) {
        tAdmin.locations.push(location)
        try {
            await tAdmin.save()
        } catch (err) {
            console.log(err)
            return res
                .status(500)
                .json({error: "Internal error occurred!"})
        }
    }

    return res  
        .status(200)
        .json({ message: "Shows added successfully!" })
}

module.exports = addShow