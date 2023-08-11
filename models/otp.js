const mongoose = require('mongoose')

const schema = mongoose.Schema
const otpSchema = new schema({
  otp: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
})

const otp = mongoose.model('OTP', otpSchema)
module.exports = otp