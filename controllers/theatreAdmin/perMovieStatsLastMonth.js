const Theatre = require("../../models/theatre")
const TheatreAdmin = require("../../models/theatreAdmin")

const findMovieInArray = (movieName, array) => {
    for (let i=0; i<array.length; i++) {
        if (array[i].movieName === movieName) {
            return true
        }
    }
    return false
}

const perMovieStatsLastMonth = async (req, res) => {
    const { theatreAdminUsername } = req.body;
    const curDate = new Date()

    let theatreAdmin;
    try {
        theatreAdmin = await TheatreAdmin.findOne({
            username: theatreAdminUsername,
        }).exec();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal error occurred!" });
    }

    const locations = theatreAdmin.locations

    let moviesData = []
    for (let i = 0; i < locations.length; i++) {
        let locationString = locations[i];
        let location
        try {
            location = await Theatre.findOne({ location: locationString }).exec()
        } catch (error) {
            console.log(error)
        }
        
        if (location) {
            location.movieInfo.forEach((movie) => {
                let existingMovie = findMovieInArray(movie.movieName, moviesData)

                if (existingMovie) {
                    let totalSeatsBooked = 0
                    for (let j=0; j<movie.timings.length; j++) {
                        let movieTiming = movie.timings[j]
                        const diffTime = curDate - movieTiming.startTiming
                        const diffDays = diffTime / (1000*60*60*24)
                        if (diffDays < 30) {
                            totalSeatsBooked += movieTiming.seating.flat().filter((seat) => seat===0).length
                        }
                    }

                    let totalRevenue = 0
                    for (let j=0; j<movie.timings.length; j++) {
                        let movieTiming = movie.timings[j]
                        const diffTime = curDate - movieTiming.startTiming
                        const diffDays = diffTime / (1000*60*60*24)
                        if (diffDays < 30) {
                            totalRevenue += movieTiming.seating.flat().filter((seat) => seat===0).length * movieTiming.price
                        }
                    }

                    for (let j=0; j<moviesData.length; j++) {
                        if (moviesData[j].movieName === movie.movieName) {
                            moviesData[j].totalSeatsBooked += totalSeatsBooked
                            moviesData[j].totalRevenue += totalRevenue
                            break
                        }
                    }
                }
                else {
                    let totalSeatsBooked = 0
                    for (let j=0; j<movie.timings.length; j++) {
                        let movieTiming = movie.timings[j]
                        const diffTime = curDate - movieTiming.startTiming
                        const diffDays = diffTime / (1000*60*60*24)
                        if (diffDays < 30) {
                            totalSeatsBooked += movieTiming.seating.flat().filter((seat) => seat===0).length
                        }
                    }
                    
                    let totalRevenue = 0
                    for (let j=0; j<movie.timings.length; j++) {
                        let movieTiming = movie.timings[j]
                        const diffTime = curDate - movieTiming.startTiming
                        const diffDays = diffTime / (1000*60*60*24)
                        if (diffDays < 30) {
                            totalRevenue += movieTiming.seating.flat().filter((seat) => seat===0).length * movieTiming.price
                        }
                    }

                    moviesData.push({
                        movieName: movie.movieName,
                        totalSeatsBooked: totalSeatsBooked,
                        totalRevenue: totalRevenue,
                    });
                }
            })
        }
        else {
            console.log("Location not found");
        }
    }

    return res
        .status(200)
        .json(moviesData)
}

module.exports = perMovieStatsLastMonth