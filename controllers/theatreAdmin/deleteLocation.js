const Theatre = require("../../models/theatre")
const TheatreAdmin = require("../../models/theatreAdmin")

const deleteLocation = async (req, res) => {
    const { location, adminName } = req.body

    let del
    try {
        del = await Theatre.deleteOne({ location: location }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Internal error occurred!" })
    }

    let tadmin
    try {
        tadmin = await TheatreAdmin.findOne({ username: adminName }).exec()
    } catch (err) {
        console.log(err)
    }

    tadmin.locations = tadmin.locations.filter((x) => {
        return x !== location
    })

    try {
        await tadmin.save()
    } catch (err) {
        console.log(err)
    }

    return res
        .status(200)
        .json({ message: "Location deleted successfully!" })
}

module.exports = deleteLocation