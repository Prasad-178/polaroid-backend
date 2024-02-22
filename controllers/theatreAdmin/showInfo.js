const TheatreAdmin = require("../../models/theatreAdmin")
const Theatre = require('../../models/theatre')

const showInfo = async (req, res) => {
    const { username } = req.body
    
    let tad
    try {
        tad = await TheatreAdmin.findOne({ username: username }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(200)
    }

    let data = []
    for (let i=0; i<tad?.locations?.length; i++) {
        let locData
        try {
            locData = await Theatre.findOne({ location: tad.locations[i] }).exec()
        } catch (err) {
            console.log(err)
            return res
                .status(500)
                .json({ error: "Internal error occurred!" })
        }

        data.push(locData)
    }

    return res
        .status(200)
        .json(data)
}

module.exports = showInfo