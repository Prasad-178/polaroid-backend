const User = require("../../models/user");
const session = require("../../session/session");

const checkIfFavourite = async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email }).exec();
    } catch (err) {
        console.log(err);
    }

    if (!existingUser) {
        return res
            .status(500)
            .json(false)
    }

    const arr = existingUser.favourites;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            return res
                .status(200)
                .json(true)
        }
    }

    return res
        .status(200)
        .json(true)
};

module.exports = checkIfFavourite;
