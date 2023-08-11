const axios = require('axios')
const variables = require('../config/index')

const getNowPlaying = async () => {
    // console.log("id is : ", id)
    // const movieDetails = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${variables.api_key}&language=en-US&page=1`)
    const movieDetails = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${variables.api_key}&language=en-US&page=1`)
    await movieDetails.data

    return movieDetails.data
}

module.exports = getNowPlaying