const List = require('../../models/list')

const getListsByUser = async (username) => {
  let lists
  try {
    lists = await List.find({ createdBy: username }).exec()
  } catch (err) {
    console.log(err)
    return
  }

  return lists
}

module.exports = getListsByUser