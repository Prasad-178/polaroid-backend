const theatre = require("../../models/theatre")
const theatreAdmin = require("../../models/theatreAdmin")

const createTheatreAdmin = async (req, res) => {
    const { username, password } = req.body

    let existingTheatreAdmin
    try {
        existingTheatreAdmin = await theatreAdmin.findOne({ username: username }).exec()
    } catch (err) {
        console.log(err)
        return res  
            .status(500)
            .json({ error: "Internal error occurred!" })
    }

    if (existingTheatreAdmin) {
        return res
            .status(403)
            .json({ error: "A theatre admin with this username already exists!" })
    }

    const hashedPassword = bcrypt.hashSync(password, 12)

    const newTheatreAdmin = new theatreAdmin({
        username: username,
        password: hashedPassword
    })

    try {
        await newTheatreAdmin.save()
    } catch (err) {
        console.log(err) 
        return res
            .status(500)
            .json({ error: "Internal error occurred!" })
    }

    return res  
        .status(200)
        .json({ message: "Theatre admin created successfully!" })
}

module.exports = createTheatreAdmin