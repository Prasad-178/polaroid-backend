const User = require("../../models/user")
const bcrypt = require("bcryptjs")
const session = require("../../session/session")

const settings = async (req, res) => {
  const { username, originalPassword, newPassword, email } = req.body

  let existingUser
  try {
    existingUser = await User.findOne({ email: email }).exec()
  } catch (err) {
    console.log(err)
    return res
        .status(500)
        .json({error: "Internal server error!"})
  }
  console.log(existingUser)

  let checkUsername 
  try {
    checkUsername = await User.findOne({ username: username }).exec()
  } catch (err) {
    console.log(err)
    return res
        .status(500)
        .json({error: "Internal server error!"})
  }

  if (checkUsername && checkUsername.email !== email) {
    return res
        .status(403)
        .json({error: "Username already taken!"})
  }

  if (originalPassword.length > 0) {
    const isPasswordSame = bcrypt.compareSync(originalPassword, existingUser.password)
    if (!isPasswordSame) {
        return res
            .status(401)
            .json({error: "Original Password is incorrect, could not update settings!"})
    
    }
    existingUser.password = bcrypt.hashSync(newPassword, 12)
  }

  existingUser.username = username

  try {
    await existingUser.save()
  } catch (err) {
    console.log(err)
    return res
        .status(500)
        .json({error: "Internal server error!"})
  }

  console.log("done")

  return res
    .status(200)
    .json({message: "Account Details updated successfully!!"})
}

module.exports = settings