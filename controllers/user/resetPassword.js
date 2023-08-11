const User = require('../../models/user')
const OTP = require('../../models/otp')
const bcrypt = require('bcryptjs')

const resetPassword = async (req, res) => {
  const { email, otp, password } = req.body

  let otpModel
  try {
    otpModel = await OTP.findOne({ email: email }).exec() 
  } catch (err) {
    res.render('forgot_password_1', {
      error: "Internal Server Error!"
    })
    return
  }

  if (!otpModel) {
    res.render('forgot_password_2', {
      error: "Please request for an OTP again!"
    })
    return
  }

  if (otp !== otpModel.otp) {
    res.render('forgot_password_2', {
      error: "OTP is wrong!"
    })
    return
  }

  let existingUser
  try {
    existingUser = await User.findOne({ email: email }).exec() 
  } catch (err) {
    res.render('forgot_password_1', {
      error: "Internal Server Error!"
    })
    return
  }

  if (!existingUser) {
    res.render('forgot_password_2', {
      error: "No user exists with this email address!"
    })
    return
  }

  const hashedPassword = bcrypt.hashSync(password, 12)
  existingUser.password = hashedPassword

  try {
    await existingUser.save()
  } catch (err) {
    res.render('forgot_password_1', {
      error: "Internal Server Error!"
    })
    return
  }

  res.redirect('/user/login')
}

module.exports = resetPassword