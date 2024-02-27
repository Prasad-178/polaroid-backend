const mongoose = require('mongoose')

const schema = mongoose.Schema
const ticketSchema = new schema({
  movieName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  ticketNumbers: {
    type: [[Number, Number]],
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  runDate: {
    type: String,
    required: true
  },
  startTiming: {
    type: Date,
    required: true
  },
  endTiming: {
    type: Date,
    required: true
  }
})

const ticket = mongoose.model('Ticket', ticketSchema)
module.exports = ticket