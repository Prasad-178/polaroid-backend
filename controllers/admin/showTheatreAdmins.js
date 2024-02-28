const Theatre = require("../../models/theatre")
const theatreAdmin = require("../../models/theatreAdmin")

const showTheatreAdmins = async (req, res) => {
    let theatreAdmins
    try {
        theatreAdmins = await theatreAdmin.find({}).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Internal server error!" })
    }

    let adminsData = []
    for (let i = 0; i < theatreAdmins.length; i++) {
        let locationsData = []
        for (let j = 0; j < theatreAdmins[i].locations.length; j++) {
            let locationString = theatreAdmins[i].locations[j]
            let theatre
            try {
                theatre = await Theatre.findOne({ location: locationString }).exec()
            } catch (err) {
                console.log(err)
            }

            if (!theatre) {
                console.log("This location does not exist!")
            }
            else {
                let totalTickets = 0;
                let totalTicketsSold = 0;
                let totalRevenue = 0;

                theatre.movieInfo.forEach((movie) => {
                    movie.timings.forEach((timing) => {
                        const ticketsBooked = timing.seating
                            .flat()
                            .filter((seat) => seat === 0).length;
                        totalTicketsSold += ticketsBooked;
                        totalTickets += timing.seating.length * timing.seating[0].length; // 100
                        totalRevenue += ticketsBooked * timing.price;
                    });
                });

                locationsData.push({
                    location: locationString,
                    totalTickets: totalTickets,
                    totalTicketsSold: totalTicketsSold,
                    totalRevenue: totalRevenue,
                });
            }
        }

        let thisAdminRevenue = 0
        let thisAdminSeatsBooked = 0
        let thisAdminTotalSeats = 0

        for (let i=0; i<locationsData.length; i++) {
            thisAdminRevenue += locationsData[i].totalRevenue
            thisAdminSeatsBooked += locationsData[i].totalTicketsSold
            thisAdminTotalSeats += locationsData[i].totalTickets
        }

        adminsData.push({
            theatreAdminName: theatreAdmins[i].username,
            locationsData: locationsData,
            thisAdminRevenue: thisAdminRevenue,
            thisAdminTotalSeats: thisAdminTotalSeats,
            thisAdminSeatsBooked: thisAdminSeatsBooked
        })
    }

    let overallAdminData = {}
    let overallRevenue = 0, overallSeatsBooked = 0, totalSeats = 0
    for (let i=0; i<adminsData.length; i++) {
        overallRevenue += adminsData[i].thisAdminRevenue
        overallSeatsBooked += adminsData[i].thisAdminSeatsBooked
        totalSeats += adminsData[i].thisAdminTotalSeats
    }

    overallAdminData["overallRevenue"] = overallRevenue
    overallAdminData["overallSeatsBooked"] = overallSeatsBooked
    overallAdminData["totalSeats"] = totalSeats

    return res
        .status(200)
        .json({
            "overallAdminData": overallAdminData,
            "adminsData": adminsData
        })
}

module.exports = showTheatreAdmins