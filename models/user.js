const mongoose = require('mongoose')

const schema = mongoose.Schema

const UserSchema = new schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    favourites: {
        type: [
            {
                id: String,
                poster_path: String
            }
        ],
        required: false
    },
    watched: {
        type: [
            {
                id: String,
                poster_path: String
            }
        ],
        required: false
    },
    planToWatch: {
        type: [
            {
                id: String,
                poster_path: String
            }
        ],
        required: false
    },
    followers: {
        type: [String],
        required: false
    },
    following: {
        type: [String],
        required: false
    },
    photo: {
        type: String,
        required: false
    }
}, {versionKey: false})

const user = mongoose.model('User', UserSchema)
module.exports = user