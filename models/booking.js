const mongoose = require('mongoose')

const schema = mongoose.Schema;
const bookingSchema = new schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  movieName: {
    type: String,
    required: true
  },
  timing: {
    type: String,
    required: true
  },
  seatXIndex: {
    type: Number,
    required: true
  },
  seatYIndex: {
    type: Number,
    required: true
  }
})

const booking = mongoose.model('Booking', bookingSchema)
module.exports = booking