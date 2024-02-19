const axios = require('axios')
const variables = require('../config')

const getMovieById = async (id) => {
    try {
        const movieDetails = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${variables.api_key}&language=en-US`)
        await movieDetails.data
    
        const movieCredits = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${variables.api_key}`)
        await movieCredits.data
        let director
        if (movieCredits.data.crew.filter(({job}) => job==="Director") && movieCredits.data.crew.filter(({job}) => job==="Director")[0]) {
            director = movieCredits.data.crew.filter(({job}) => job==="Director")[0].name
        }
    
        movieDetails.data.director = director
        return movieDetails.data
    } catch (err) {
        console.log(err)
    }
}

module.exports = getMovieById