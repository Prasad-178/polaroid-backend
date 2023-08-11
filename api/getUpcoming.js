const axios = require('axios')
const variables = require('../config/index')

const getUpcoming = async () => {
    const movieDetails = await axios.get(`
    https://api.themoviedb.org/3/movie/upcoming?api_key=${variables.api_key}&language=en-US&page=1`)
    await movieDetails.data
    // console.log(movieDetails.data)

    return movieDetails.data
}

module.exports = getUpcoming