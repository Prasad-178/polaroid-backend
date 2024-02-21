const User = require("../../models/user")

const imageUploadDatabase = async (req, res) => {
    const {email, image} = req.body

    let user
    try {
        user = await User.findOne({ email: email }).exec()
    } catch (err) {
        console.log(err)
        return res  
            .status(500)
            .json({error: "Internal error occurred!"})
    }

    user.photo = image

    try {
        await user.save()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({error: "Internal error occurred!"})
    }

    return res
        .status(200)
        .json({message: "Image successfully updated!"})
}

module.exports = imageUploadDatabase