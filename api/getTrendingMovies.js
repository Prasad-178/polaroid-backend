const axios = require('axios')
const variables = require('../config/index')

const getTrendingMovies = async () => {
    const movieDetails = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${variables.api_key}`)
    await movieDetails.data

    return movieDetails.data
}

module.exports = getTrendingMovies