const User = require('../../models/user')
const OTP = require('../../models/otp')
const bcrypt = require('bcryptjs')

const resetPassword = async (req, res) => {
  const { email, otp, password } = req.body
  console.log("reset pass form")
  let otpModel
  try {
    otpModel = await OTP.findOne({ email: email }).exec() 
  } catch (err) {
    return res
      .status(500)
      .json({ 
        error: "Internal Server Error!"
       })
  }

  if (!otpModel) {
    return res
      .status(500)
      .json({ 
        error: "Please request for an OTP again!"
       })
  }

  if (otp !== otpModel.otp) {
    return res
      .status(500)
      .json({ 
        error: "OTP entered is wrong!"
       })
  }

  let existingUser
  try {
    existingUser = await User.findOne({ email: email }).exec() 
  } catch (err) {
    return res
      .status(500)
      .json({ 
        error: "Internal Server Error!"
       })
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
    return res
      .status(500)
      .json({ 
        error: "Internal Server Error!"
       })
  }

  // res.redirect('/user/login')
  return res  
    .status(200)
    .json({ 
      message: "Password reset successfully!"
     })
}

module.exports = resetPassword