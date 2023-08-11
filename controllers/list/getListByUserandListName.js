const List = require("../../models/list")

const getList = async (username, listName) => {
  let list 
  try {
    list = await List.findOne({ createdBy: username, listName: listName }).exec()
  } catch (err) {
    console.log(err)
  }

  return list
}

module.exports = getList