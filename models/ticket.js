const mongoose = require('mongoose')

const schema = mongoose.Schema
const ticketSchema = new schema({
  otp: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
})

const ticket = mongoose.model('Ticket', ticketSchema)
module.exports = ticket