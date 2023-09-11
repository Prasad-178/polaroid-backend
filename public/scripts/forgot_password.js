var isInvalidEmail = false;

function validateForm() {
    var emailValidation;

    emailValidation = checkEmail();

    if (emailValidation === false) {
        document.getElementById('alert-zone-1').innerHTML = "Please enter a valid email address";
        document.getElementById('alert-zone-2').innerHTML = "";
    }
    else {
        document.getElementById('alert-zone-1').innerHTML = "";
        document.getElementById('alert-zone-2').innerHTML = "";
    }

    return emailValidation;
}

document.getElementById("forgotPassForm").onsubmit = function(e) {
    e.preventDefault()
    // console.log("ummmmmm")
    
    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        window.location.href = "http://localhost:3500/user/resetpassword";
      }
      const responseText = JSON.parse(this.responseText)
      console.log(responseText)
      if (this.readyState === 4 && this.status >= 400) {
        document.getElementById("alert-zone-1").innerHTML = responseText.error
      }
    }
  
    xhr.open("POST", "http://localhost:3500/user/forgotpassword", true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(`email=${document.getElementById("email-input").value}`);
}

function checkEmail() {
    var emailRegex = /\S+@\S+\.\S+/;

    var email = document.getElementById('email-input').value;

    if ((email === '') || (!email.match(emailRegex))) {
        isInvalidEmail = true;
    }
    else {
        isInvalidEmail = false;
    }

    onFocusoutEmail();

    return !isInvalidEmail;
}


function onFocusinEmail() {
    disableButton();
    document.getElementById('email-input').style.outline = "none";
    document.getElementById('email-input').style.backgroundColor = "white";
}

function onFocusoutEmail() {
    disableButton();
    if (isInvalidEmail) {
        document.getElementById('email-input').style.backgroundColor = "#eb9898";
        document.getElementById('email-input').style.outline = "2px solid red";
    }
    else {
        document.getElementById('email-input').style.backgroundColor = "#a3d4ec";
        document.getElementById('email-input').style.outline = "none";
    }
}

function disableButton() {
    if (isInvalidEmail) {
        document.getElementById('submit-button').disabled = true;
    }
    else {
        document.getElementById('submit-button').disabled = false;
    }
}

document.getElementById('email-input').addEventListener("focusin", onFocusinEmail);
document.getElementById('email-input').addEventListener("focusout", onFocusoutEmail);
