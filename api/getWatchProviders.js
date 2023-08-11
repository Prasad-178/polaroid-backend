const axios = require('axios')
const variables = require('../config/index')

const getWatchProviders = async (id) => {
    // console.log("id is : ", id)
    // const movieDetails = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${variables.api_key}&language=en-US&page=1`)
    const watchProviders = await axios.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${variables.api_key}`)
    await watchProviders.data

    return watchProviders.data
}

module.exports = getWatchProviders