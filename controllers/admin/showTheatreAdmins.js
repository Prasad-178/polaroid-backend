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

    return res
        .status(200)
        .json(theatreAdmins)
}

module.exports = showTheatreAdmins