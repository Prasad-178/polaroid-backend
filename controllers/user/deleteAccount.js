const User = require('../../models/user')
const session = require('../../session/session')

const deleteAccount = async (req, res) => {
  try {
    await User.findOneAndDelete({ email: session.email }).exec()
  } catch (err) {
    console.log(err)
  }

  res.redirect('/user/register')
}

module.exports = deleteAccount