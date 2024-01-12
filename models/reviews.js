const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    movie: {
        type: String,
        required: true
    }
})
    
const review = mongoose.model('Review', ReviewSchema)
module.exports = review