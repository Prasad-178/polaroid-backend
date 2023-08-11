const axios = require('axios')
const variables = require('../config/index')

const getTrendingThisWeek = async () => {
    const movieDetails = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${variables.api_key}`)
    await movieDetails.data

    const ids = []
    const directors = []
    for (let i=0; i<3; i++) {
        ids.push(movieDetails.data.results[i].id)
    }

    for (let i=0; i<3; i++) {
        const movieDetails = await axios.get(`https://api.themoviedb.org/3/movie/${ids[i]}/credits?api_key=${variables.api_key}`)
        await movieDetails.data
        const director = movieDetails.data.crew.filter(({job}) => job==="Director")
        directors.push(director[0].name)
    }

    movieDetails.data.results.directors = directors
    return movieDetails.data
}

module.exports = getTrendingThisWeek