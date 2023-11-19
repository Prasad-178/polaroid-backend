const User = require('../../models/user')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    const { email, username, password } = req.body

    let existingUser
    try {
        existingUser = await User.findOne({ email: email }).exec()
    } catch (err) {
        console.log(err)
        // res.render('register', { error: "Internal server error!" })
        // return
        return res
            .status(500)
            .json({ error: "Internal server error!" })
    }

    if (existingUser) {
        // res.render('register', { error: "A user with this email already exists!" })
        // return
        return res
            .status(403)
            .json({ error: "A user with this email already exists!" })
    }

    try {
        existingUser = await User.findOne({ username: username }).exec()
    } catch (err) {
        console.log(err)
        // res.render('register', { error: "Internal server error!" })
        // return
        return res
            .status(500)
            .json({ error: "Internal server error!" })
    }

    if (existingUser) {
        // console.log(err)
        // res.render('register', { error: "A user with this username already exists!" })
        // return
        return res
            .status(402)
            .json({ error: "A user with this username already exists!" })
    }

    const hashedPassword = bcrypt.hashSync(password, 12)

    const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
        favourites: [],
        watched: [],
        planToWatch: [],
        followers: [],
        following: [],
        photo: ""
    })

    try {
        await newUser.save()
    } catch (err) {
        console.log(err)
        // res.render('register', { error: "Internal server error!" })
        // return
        return res
            .status(403)
            .json({ error: "A user with this username already exists!" })
    }

    return res
        .status(200)
        .json({message: "Registered successfully!"})
}

module.exports = register
