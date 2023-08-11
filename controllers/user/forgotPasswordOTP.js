const User = require('../../models/user')
const OTP = require('../../models/otp')
const nodemailer = require('nodemailer')
const { randomUUID } = require('crypto')
const variables = require('../../config')

const uuid = randomUUID().slice(0, 6)
const html = `
  <div style="display: 'flex', flex-direction: 'column', justify-content: 'center', align-items: 'center'">
    <h1>Reset your Polaroid Password</h1>
    <p style="color: 'lightblue'">Your OTP is ` + uuid + ` </p>
    <p> Kindly ignore this email if this was not you </p>
    &#169 Polaroid Limited. Made by Arka, Prasad, Urjasvi, Biswadip and Kalyan
  </div>
`
const forgotPasswordOTP = async (req, res) => {
  const { email } = req.body
  let user 
  try {
    user = await User.findOne({ email: email }).exec()
  } catch (err) {
    res.render('forgot_password_1', {
      error: "Internal Server Error!"
    })
    return
  }

  if (!user) {
    res.render('forgot_password_1', {
      error: "No such user exists!"
    })
    return
  }

  try {
    await OTP.findOneAndDelete({ email: email }).exec()
  } catch (err) {
    res.render('forgot_password_1', {
      error: "Internal Server Error!"
    })
    return
  }

  const otp = new OTP({
    email: email,
    otp: uuid
  })

  try {
    otp.save()
  } catch (err) {
    res.render('forgot_password_1', {
      error: "Internal Server Error!"
    })
    return
  }

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "polaroid.email.ltd@gmail.com",
        pass: variables.app_password
    }
  })

  let mailOptions = {
      from: "polaroid.email.ltd@gmail.com",
      to: email,
      subject: "Instructions to Reset Polaroid Password",
      html: html
  }

  transporter.sendMail(mailOptions, (err, success) => {
      if (err) {
          console.log(err)
          return
      }
      else {
          console.log("Success, email has been sent.", success)
      }
  })

  res.redirect('/user/resetpassword')

}

module.exports = forgotPasswordOTP