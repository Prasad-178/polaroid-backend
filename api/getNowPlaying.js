const axios = require('axios')
const variables = require('../config/index')
const XMLHttpRequest = require('xhr2')

const getNowPlaying = async () => {
    const movieDetails = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${variables.api_key}&language=en-US&page=1`)

    await movieDetails.data

    // console.log(movieDetails.data)

    // const xhr = new XMLHttpRequest();
    // let movieDetails
    // xhr.onreadystatechange = function () {
    //     if (this.readyState === 4 && this.status === 200) {
    //         const responseText = JSON.parse(this.responseText)
    //         // console.log(responseText.results)
    //         // return responseText
    //         movieDetails = responseText
    //     }
    //     // if (this.readyState === 4 && this.status >= 400) {
    //     //     const responseText = JSON.parse(this.responseText)
    //     //     return responseText
    //     // }
    // }
    
    // xhr.open("GET", `https://api.themoviedb.org/3/movie/now_playing?api_key=${variables.api_key}&language=en-US&page=1`, true);
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // xhr.send();

    return movieDetails.data
    // return movieDetails
}

module.exports = getNowPlaying