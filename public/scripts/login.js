var isInvalidEmail = false;

function emailValidation() {
  var emailRegex = /\S+@\S+\.\S+/;

  var email = document.getElementById("email-input").value;

  if (email == "" || !email.match(emailRegex)) {
    document.getElementById('alert-zone').innerHTML = "Please enter a valid email address";

    isInvalidEmail = true;
  }
  else {
    document.getElementById('alert-zone').innerHTML = "";

    isInvalidEmail = false;
  }

  onFocusoutEmail();
  disableButton();

  return !isInvalidEmail;
}

document.getElementById("loginForm").onsubmit = function(e) {
  e.preventDefault()
  console.log("ummmmmm")
  
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      window.location.href = "http://localhost:3500/";
    }
    if (this.readyState === 4 && this.status >= 400) {
      const responseText = JSON.parse(this.responseText)
      document.getElementById("alert-zone").innerHTML = responseText.error
    }
  }

  xhr.open("POST", "http://localhost:3500/user/login", true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(`email=${document.getElementById("email-input").value}&password=${document.getElementById("password-input").value}`);
}

function onFocusinEmail() {
  document.getElementById("email-input").style.outline = "none";
  document.getElementById("email-input").style.backgroundColor = "white";
}

function onFocusinPass() {
  document.getElementById("password-input").style.outline = "none";
  document.getElementById("password-input").style.backgroundColor = "white";
}

function onFocusoutEmail() {
  if (isInvalidEmail) {
    document.getElementById("email-input").style.backgroundColor = "#eb9898";
    document.getElementById("email-input").style.outline = "2px solid red";
  } else {
    document.getElementById("email-input").style.backgroundColor = "#a3d4ec";
  }
}

function onFocusoutPass() {
  document.getElementById("password-input").style.backgroundColor = "#a3d4ec";
}

function disableButton() {
  if (isInvalidEmail) {
    document.getElementById('submit-button').disabled = true;
  }
  else {
    document.getElementById('submit-button').disabled = false;
  }
}

document.getElementById("email-input").addEventListener("focusin", onFocusinEmail);
document.getElementById("email-input").addEventListener("focusout", onFocusoutEmail);

document.getElementById("password-input").addEventListener("focusin", onFocusinPass);
document.getElementById("password-input").addEventListener("focusout", onFocusoutPass);
