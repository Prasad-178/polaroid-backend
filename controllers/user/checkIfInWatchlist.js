const User = require('../../models/user')
const session = require('../../session/session')

const checkIfInWatchlist = async (req, res) => {
    const { id } = req.params
    const { email } = req.body
    let existingUser
    try {
        existingUser = await User.findOne({ email: email }).exec()
    } catch (err) {
        console.log(err)
    }

    if (!existingUser) {
        return res
            .status(200)
            .json(false)
    }

    const arr = existingUser.planToWatch
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

module.exports = checkIfInWatchlist