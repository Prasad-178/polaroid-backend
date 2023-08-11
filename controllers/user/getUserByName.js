const User = require('../../models/user')
const List = require('../../models/list')

const getUserByName = async (name) => {
  let user
  try {
    user = await User.findOne({ username: name }).exec()
  } catch (err) {
    console.log(err)
  }

  let lists = await List.find({ createdBy: name }).exec()

  let data = {}
  data.user = user
  data.listLength = lists.length

  return data
}

module.exports = getUserByName