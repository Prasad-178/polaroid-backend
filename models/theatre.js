const mongoose = require('mongoose')

const schema = mongoose.Schema
const defaultSeating =[
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

const theatreSchema = new schema({
  location: {
    type: String,
    required: true,
    unique: true
  },
  movieInfo: {
    type: [
      {
        movieName: String,
        timings: [{
          runDate: Date, // date of the show
          startTiming: Date, // start time of the show
          endTiming: Date, // end time of the show
          seating: {
            type: [[Number]],
            required: false,
            default: defaultSeating
          },
          price: Number
        }]
      }
    ],
    required: false
  }
}, {versionKey: false})

const theatre = mongoose.model('Theatre', theatreSchema)
module.exports = theatre