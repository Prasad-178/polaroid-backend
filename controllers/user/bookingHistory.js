const Ticket = require("../../models/ticket")

const bookingHistory = async (req, res) => {
    const { email } = req.body

    let tickets
    try {
        tickets = await Ticket.find({ email: email }).exec()
    } catch (err) {
        console.log(err)
        return res  
            .status(500)
            .json({ error: "Internal error occurred!" })
    }

    return res
        .status(200)
        .json(tickets)
}

module.exports = bookingHistory