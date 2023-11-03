const Theatre = require('../../models/theatre')

const getMovieAvailability = async (req, res) => {
  const id = req.params.id
  let movies
  try {
    movies = await Theatre.find({}).exec()
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({error: "Internal server error!"})
  }

  let details = []
  for (let i=0; i<movies.length; i++) {
    for (let j=0; j<movies[i].movieInfo.length; j++) {
      if (movies[i].movieInfo[j].movieName === id) {
        let locations = []
        let timings = []
        locations.push(movies[i].location)
        for (let k=0; k<movies[i].movieInfo[j].timings.length; k++) {
          timings.push(movies[i].movieInfo[j].timings[k].timing)
        }

        details.push({
          locations: locations,
          timings: timings
        })
      }
    }
  }
  // console.log(details)

  return res
    .status(200)
    .json(details)
}

module.exports = getMovieAvailability