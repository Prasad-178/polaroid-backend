const axios = require('axios')
const variables = require('../config/index')

const getMovieCredits = async (id) => {
    // console.log("id is : ", id)
    // const movieDetails = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${variables.api_key}&language=en-US&page=1`)
    const movieCredits = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${variables.api_key}&language=en-US`)
    await movieCredits.data

    return movieCredits.data
}

module.exports = getMovieCredits