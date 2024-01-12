const Theatre = require("../../models/theatre")

const deleteLocation = async (req, res) => {
    const { location } = req.body

    let del
    try {
        del = await Theatre.deleteLocation({ location: location }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Internal error occurred!" })
    }

    return res
        .status(200)
        .json({ message: "Location deleted successfully!" })
}

module.exports = deleteLocation