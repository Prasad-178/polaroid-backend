var original_seat_count = retrieve_no_seats();

localStorage.getItem("")

const urlArray = location.href.split('/')
const timing = localStorage.getItem("movie")
const id = urlArray[urlArray.length - 2]
const venueName = localStorage.getItem("venue")
const venueIndex = urlArray[urlArray.length - 3]
const fetchUrl = "http://localhost:3500/retrieveseats/"+id+"/"+timing+"/"+venueName

var seat_matrix
fetch(fetchUrl).then((res) => {
  return res.json()
}).then((data) => {
  console.log(data)
  seat_matrix = data
  render_seats()
  finalize_seat()
})

var seat_list = [];

function render_seats() {
  var seat_container = document.getElementById('seat-container');
  var seat = document.getElementById('00');
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      var copy = seat.cloneNode(true);
      copy.id = "" + i + j;
      if (seat_matrix[i][j] === 0)
        copy.classList.add("Occupied");
      seat_container.append(copy);
    }
  }

  seat_container.removeChild(seat_container.firstElementChild);
}

function retrieve_no_seats() {
  console.log(+(localStorage.getItem('person_counter')))
  return +(localStorage.getItem('person_counter'));
}

function seat_selection(id) {
  var seat = document.getElementById(id);
  var i = +(Math.floor(id / 10));
  var j = +(id % 10);

  if (seat_matrix[i][j] === 1) {
    seat.classList.add("selected");
    seat_matrix[i][j]++;
    seat_list.push("" + i +j);
  }
  else if (seat_matrix[i][j] === 2) {
    seat.classList.remove("selected");
    seat_matrix[i][j]--;

    // remove the element by id
    var index = seat_list.indexOf("" + i +j);
    if (index !== -1)
      seat_list.splice(index, 1);
  }

}

function finalize_seat() {
  if (seat_list.length !== original_seat_count) {
    document.getElementById('submit-button').disabled = true;
    document.getElementById('info-zone').style.color = "#eb455f";
  }
  else {
    document.getElementById('submit-button').disabled = false;
    document.getElementById('info-zone').style.color = "LimeGreen";
  }

  document.getElementById('info-zone').innerHTML = seat_list.length;
}

async function seat_list_ret() {
  localStorage.setItem("seat_list", seat_list);
  localStorage.setItem("movieId", id)

  const venue = localStorage.getItem("venue")
  const info_array = localStorage.getItem("info_array")
  const movieTime = localStorage.getItem("movie")
  const res = await fetch('http://localhost:3500/payment',{
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      seat_list,
      venue,
      info_array,
      movieTime,
      id
    })
  }).then(res=>{
    if(res.ok) {
      return res.json()
    }
    return res.json().then(json=>Promise.reject(json))
  }).then(url=>{
    location.href = url.url
  })

  return true;
}
