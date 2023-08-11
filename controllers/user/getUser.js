const User = require('../../models/user')
const List = require('../../models/list')
const session = require('../../session/session')

const getUser = async () => {
  let user
  try {
    user = await User.findOne({ username: session.username }).exec()
  } catch (err) {
    console.log(err)
  }

  let lists = await List.find({ createdBy: session.username }).exec()

  let data = {}
  data.user = user
  data.lists = lists.length
  console.log(data)

  return data
}

module.exports = getUser