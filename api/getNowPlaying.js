const axios = require('axios')
const variables = require('../config/index')
const XMLHttpRequest = require('xhr2')

const getNowPlaying = async () => {
    const movieDetails = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${variables.api_key}&language=en-US&page=1`)

    await movieDetails.data

    // let xhr = new XMLHttpRequest();

    // var ret
    
    // let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${variables.api_key}&language=en-US&page=1`;
    // xhr.open("GET", url, true);
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState == 4 && xhr.status == 200) {
    //         var json = JSON.parse(xhr.responseText)
    //         // console.log("json is : ", json)
    //         ret = json
    //     }
    // }
    // xhr.send()

    // console.log(ret)

    return movieDetails.data
}

module.exports = getNowPlaying