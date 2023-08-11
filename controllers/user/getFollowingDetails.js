const User = require('../../models/user')
const List = require('../../models/list')

const getFollowingDetails = async (username) => {
  let existingUser
  try {
    existingUser = await User.findOne({ username: username }).exec()
  } catch (err) {
    console.log(err)
  }

  let followingIDs = []
  for (let i=0; i<existingUser.following.length; i++) {
    followingIDs.push(existingUser.following[i])
  }

  const lists = await List.find({ createdBy: username })

  let data = []
  for (let i=0; i<followingIDs.length; i++) {
    const following = await User.findOne({ email: followingIDs[i] }).exec()
    data.push({
      username: following.username,
      followers: following.followers.length,
      following: following.following.length,
      watched: following.watched.length,
      favourite: following.favourites.length,
      lists: lists.length
    })
  }

  return data
}

module.exports = getFollowingDetails