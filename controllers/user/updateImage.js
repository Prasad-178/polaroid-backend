const multer = require('multer')
const User = require('../../models/user')

const uploadImage = async (req, res, next) => {
    console.log("req file is : ", req.file)

    return res
        .status(200)
        .json({message: "Multer image upload done successfully!"})
}

module.exports = uploadImage