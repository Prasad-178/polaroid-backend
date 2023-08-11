var isInvalidEmail = false;
var isInvalidMobile = false;
var personal_info_counter = 1;

const urlArray = location.href.split('/')
const id = urlArray[urlArray.length - 1]
const fetchUrl = "http://localhost:3500/retrievebookingdetails/"+id

async function renderTimings() {
  let data
  fetch(fetchUrl).then((res) => {
    return res.json()
  }).then((data)=>{
    data = data
  
    let venue = document.getElementById("venue").value
    let venueTimings
    venue = +venue
    
    console.log(data)
    
    venueTimings = data[venue].timings
    
    const movieId = document.getElementById("movie")
    while (movieId.children.length > 1) {
      movieId.lastChild.remove()
    }
    
    let node = document.querySelector(".timingClass")
    for (let i=0; i<venueTimings.length; i++) {
      let temp = node.cloneNode(true)
      temp.value = i
      temp.innerHTML = venueTimings[i]
      node.parentNode.appendChild(temp)
    }
  })
}

renderTimings()

function validateForm() {
  var emailValidation;
  var mobileValidation;

  emailValidation = checkEmail();
  mobileValidation = checkMobile();

  if ((emailValidation === false) && (mobileValidation === false)) {
    document.getElementById('alert-zone-1').innerHTML = "Please enter a valid email address";
    document.getElementById('alert-zone-2').innerHTML = "Please enter a valid mobile number";
  }
  else if ((emailValidation === false) && (mobileValidation === true)) {
    document.getElementById('alert-zone-1').innerHTML = "Please enter a valid email address";
    document.getElementById('alert-zone-2').innerHTML = "";
  }
  else if ((emailValidation === true) && (mobileValidation === false)) {
    document.getElementById('alert-zone-1').innerHTML = "Please enter a valid mobile number";
    document.getElementById('alert-zone-2').innerHTML = "";
  }
  else {
    document.getElementById('alert-zone-1').innerHTML = "";
    document.getElementById('alert-zone-2').innerHTML = "";
  }

  return emailValidation && mobileValidation;
}

function checkEmail() {
  var emailRegex = /^\S+@\S+\.\S+$/;

  var email = document.getElementById('email-input').value;

  if (email === '') {
    isInvalidEmail = false;
  }
  else if (!email.match(emailRegex)) {

    isInvalidEmail = true;
  }
  else {
    isInvalidEmail = false;
  }

  onFocusoutEmail();

  return !isInvalidEmail;
}

function checkMobile() {
  var mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  var mobile = document.getElementById('mobile-input').value;

  if (mobile === '') {
    isInvalidMobile = false;
  }
  else if (!mobile.match(mobileRegex)) {
    isInvalidMobile = true;
  }
  else {
    isInvalidMobile = false;
  }

  onFocusoutMobile();
  disableButton();

  return !isInvalidMobile;
}

function onFocusinEmail() {
  document.getElementById('email-input').style.outline = "none";
  document.getElementById('email-input').style.backgroundColor = "white";
}

function onFocusoutEmail() {
  if (isInvalidEmail) {
    document.getElementById('email-input').style.backgroundColor = "#eb9898";
    document.getElementById('email-input').style.outline = "2px solid red";
  }
  else {
    document.getElementById('email-input').style.backgroundColor = "#a3d4ec";
    document.getElementById('email-input').style.outline = "none";
  }
}

function onFocusinMobile() {
  document.getElementById('mobile-input').style.outline = "none";
  document.getElementById('mobile-input').style.backgroundColor = "white";
}

function onFocusoutMobile() {
  if (isInvalidMobile) {
    document.getElementById('mobile-input').style.backgroundColor = "#eb9898";
    document.getElementById('mobile-input').style.outline = "2px solid red";
  }
  else {
    document.getElementById('mobile-input').style.backgroundColor = "#a3d4ec";
    document.getElementById('mobile-input').style.outline = "none";
  }
}

function disableButton() {
  var isAccepted = document.getElementById('accept-term-input');

  if (isInvalidMobile || isInvalidEmail || (isAccepted.checked == false)) {
    document.getElementById('submit-button').disabled = true;
  }
  else {
    document.getElementById('submit-button').disabled = false;
  }
}

function setDateRange() {
  var dateSelector = document.getElementsByName('date-select');

  var now = new Date()

  var year = now.getFullYear();
  var month = now.getMonth() + 1;   // As months start with 0
  var date = now.getDate();

  if (month < 10)
    month = '0' + month;

  if (date < 10)
    date = '0' + date;

  var formattedNow = year + '-' + month + '-' + date;

  for (var i = 0; i < dateSelector.length; i++) {
    dateSelector[i].max = formattedNow;
  }
}

function addMonths(date, months) {
  var d = date;
  d.setMonth(d.getMonth() + +months);

  return d;
}

setDateRange();

function multiplyForm(node) {
  var copy = node.cloneNode(true);

  var inputType = copy.getElementsByTagName('input');
  var textAreaType = copy.getElementsByTagName('textarea');

  textAreaType[0].value = '';

  for (var i = 0; i < inputType.length; i++) {
    inputType[i].value = '';
  }

  node.parentNode.append(copy);
}

function addPerson() {
  multiplyForm(document.querySelector('.personal-info-div'));
  personal_info_counter++;
  setDateRange();
}

function refreshPage(){
  personal_info_counter = 1;
  localStorage.clear();
  window.location.reload();
}

function submit_form() {
  console.log("trigger");
  localStorage.setItem("email", document.getElementById('email-input').value);
  localStorage.setItem("mobile", document.getElementById('mobile-input').value);

  const venueArray = document.getElementById('venue').children
  const venueIndex = document.getElementById('venue').value
  localStorage.setItem("venue", venueArray[+venueIndex].innerHTML);

  const movieArray = document.getElementById('movie').children
  const movieIndex = document.getElementById('movie').value
  localStorage.setItem("movie", movieArray[+movieIndex+1].innerHTML);

  const venue = document.getElementById('venue').value
  const movieName = document.getElementById('movie').value
  const hrefArray = location.href.split('/')
  const movieId = hrefArray[hrefArray.length - 1]

  let info_array = [];

  localStorage.setItem("info_array", JSON.stringify(info_array));

  var person_infos = document.getElementsByName('person-personal-info');

  for (var i = 0; i < person_infos.length; i++) {
    var person_infos_children = person_infos[i].children;
    let temp_obj = [];

    for (var j = 0; j < person_infos_children.length; j++) {

      let temp_child = person_infos_children[j].children;
      let temp = temp_child[1].value;
      temp_obj.push(temp);
    }

    info_array = JSON.parse(localStorage.getItem("info_array") || "[]");
    info_array.push(temp_obj);


    localStorage.setItem("info_array", JSON.stringify(info_array));
  }

  localStorage.setItem("person_counter", personal_info_counter)
  let url_string = '/booking/' + venue + '/' + movieId.split("?")[0] + '/' + movieName;
  console.log(url_string)

  window.location.replace(url_string)
}

document.getElementById('email-input').addEventListener("focusin", onFocusinEmail);
document.getElementById('email-input').addEventListener("focusout", onFocusoutEmail);

document.getElementById('mobile-input').addEventListener("focusin", onFocusinMobile);
document.getElementById('mobile-input').addEventListener("focusout", onFocusoutMobile);
