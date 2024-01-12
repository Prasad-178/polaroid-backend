const mongoose = require("mongoose")

const theatreAdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    locations: {
        type: [String],
        required: true,
        default: []
    },
    password: {
        type: String,
        required: true
    }
})

const theatreAdmin = mongoose.model('TheatreAdmin', theatreAdminSchema)
module.exports = theatreAdmin