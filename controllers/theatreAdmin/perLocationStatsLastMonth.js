const Theatre = require("../../models/theatre");
const TheatreAdmin = require("../../models/theatreAdmin");

const perLocationStatsLastMonth = async (req, res) => {
    const { theatreAdminUsername } = req.body;

    let theatreAdmin;
    try {
        theatreAdmin = await TheatreAdmin.findOne({
            username: theatreAdminUsername,
        }).exec();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal error occurred!" });
    }

    const locations = theatreAdmin.locations;

    let locationsData = [];
    for (let i = 0; i < locations.length; i++) {
        let locationString = locations[i];
        let theatre;
        try {
            theatre = await Theatre.findOne({ location: locationString });
        } catch (error) {
            console.log(error);
        }

        if (theatre) {
            let totalTickets = 0;
            let totalTicketsSold = 0;
            let totalRevenue = 0;

            let curDate = new Date()
            theatre.movieInfo.forEach((movie) => {
                movie.timings.forEach((timing) => {
                    console.log(movie.movieName)
                    const diffTime = curDate - timing.startTiming
                    const diffDays = diffTime / (1000*60*60*24)
                    console.log(diffDays)
                    if (diffDays < 30) {
                        const ticketsBooked = timing.seating
                            .flat()
                            .filter((seat) => seat === 0).length;
                        totalTicketsSold += ticketsBooked;
                        totalTickets += timing.seating.length * timing.seating[0].length; // 100
                        totalRevenue += ticketsBooked * timing.price;
                    }
                });
            });

            locationsData.push({
                location: locationString,
                totalTickets: totalTickets,
                totalTicketsSold: totalTicketsSold,
                totalRevenue: totalRevenue,
            });
        } else {
            console.log("Location not found");
            return res.status(500).json({ message: "No such location exists!" });
        }
    }

    return res
        .status(200)
        .json(locationsData);
};

module.exports = perLocationStatsLastMonth;
