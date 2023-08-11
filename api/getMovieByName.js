const axios = require('axios')
const variables = require('../config')
const getMovieById = require('./getMovieById')

const getMovieByName = async (name) => {
    // console.log("hi")
    name = name.toString().trim()
    while (name.includes(" ")) {
        name = name.split(" ").join("%20")
    }
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${variables.api_key}&language=en-US&query=${name}&page=1&include_adult=false`

    const movieDetails = await axios.get(url)
    await movieDetails.data

    const arr = movieDetails.data.results
    const Ids = []
    for (let i=0; i<arr.length; i++) {
        Ids.push(arr[i].id)
    }
    const details = await getMovieDetails(Ids)

    return details
}

const getMovieDetails = async (Ids) => {
    const arr = []
    let len = Ids.length
    if (len > 5) len = 5
    for (let i=0; i<len; i++) {
        // console.log(Ids[i])
        const details = await getMovieById(Ids[i])
        arr.push(details)
    }

    // console.log(arr)

    return arr
}

module.exports = getMovieByName