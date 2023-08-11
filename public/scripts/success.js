const url = "http://localhost:3500/confirmticket"

const seat_list = localStorage.getItem("seat_list")
const venue = localStorage.getItem("venue")
const email = localStorage.getItem("email")
const info_array = localStorage.getItem("info_array")
const mobile = localStorage.getItem("mobile")
const person_counter = localStorage.getItem("person_counter")
const movieTime = localStorage.getItem("movie")
const movieId = localStorage.getItem("movieId")
console.log(seat_list, typeof seat_list)

const res = fetch(url, {
    method: "post",
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        seat_list,
        venue,
        email,
        info_array,
        mobile,
        person_counter,
        movieTime,
        movieId
    })
}).then((res) => {
    if (res.ok) {
        return res.json()
    }
    return res.json().then(json => Promise.reject(json))
}).then((res) => {
    console.log(res)
})
