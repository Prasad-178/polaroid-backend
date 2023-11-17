const User = require('../../models/user')
const session = require('../../session/session')

const checkIfWatched = async (req, res) => {
    const { id } = req.params
    const { email } = req.body
    let existingUser
    try {
        existingUser = await User.findOne({ email: email }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ message: "Internal server error!" })
    }

    if (!existingUser) {
        return res
            .status(200)
            .json(false)
    }

    const arr = existingUser.watched
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            return res
                .status(200)
                .json(true)
        }
    }

    return res
        .status(200)
        .json(false)
}

module.exports = checkIfWatched