const axios = require('axios')
const variables = require('../config/index')

const getSimilarMovies = async (id) => {
    const movieDetails = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${variables.api_key}&language=en-US&page=1`)
    await movieDetails.data

    return movieDetails.data
}

module.exports = getSimilarMovies