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
          timing: String,
          seating: {
            type: [[Number]],
            required: false,
            default: defaultSeating
          }
        }]
      }
    ]
  }
}, {versionKey: false})

const theatre = mongoose.model('Theatre', theatreSchema)
module.exports = theatre