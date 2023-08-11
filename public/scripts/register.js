var isInvalidEmail = false;
var isPassSame = true;
var isPassStrong = true;

function validateForm() {
  var emailValidation;
  var passValidation;
  var passStrength;

  emailValidation = checkEmail();
  passValidation = checkPassword();
  passStrength = strongPassCheck();

  if ((emailValidation === false) && (passValidation === false) && ((passStrength === false) || (passStrength === true))) {
    document.getElementById('alert-zone-1').innerHTML = "Please enter a valid email address";
    document.getElementById('alert-zone-2').innerHTML = "Password does not match";
  }
  else if ((emailValidation === false) && (passValidation === true) && (passStrength === false)) {
    document.getElementById('alert-zone-1').innerHTML = "Please enter a valid email address";
    document.getElementById('alert-zone-2').innerHTML = "Please enter a strong password";
  }
  else if ((emailValidation === false) && (passValidation === true) && (passStrength === true)) {
    document.getElementById('alert-zone-1').innerHTML = "Please enter a valid email address";
    document.getElementById('alert-zone-2').innerHTML = "";
  }
  else if ((emailValidation === true) && (passValidation === false) && ((passStrength === false) || (passStrength === true))) {
    document.getElementById('alert-zone-1').innerHTML = "Password does not match";
    document.getElementById('alert-zone-2').innerHTML = "";
  }
  else if (passStrength === false)  {
    document.getElementById('alert-zone-1').innerHTML = "Please enter a strong password";
    document.getElementById('alert-zone-2').innerHTML = "";
  }
  else {
    document.getElementById('alert-zone-1').innerHTML = "";
    document.getElementById('alert-zone-2').innerHTML = "";
  }

  return emailValidation && passValidation && passStrength;
}

function checkEmail() {
  var emailRegex = /\S+@\S+\.\S+/;

  var email = document.getElementById('email-input').value;

  if ((email === '') || (!email.match(emailRegex))) {
    // document.getElementById('email-input').style.outline = "2px solid red";
    // document.getElementById('email-input').style.backgroundColor = "#eb9898";

    isInvalidEmail = true;
  }
  else {
    isInvalidEmail = false;
  }

  onFocusoutEmail();

  return !isInvalidEmail;
}

function checkPassword() {
  console.log('checkPassword');

  var pass = document.getElementById('password-input').value;
  var repass = document.getElementById('repassword-input').value;

  if (pass !== repass) {
    isPassSame = false;

  }
  else {
    isPassSame = true;
  }

  onFocusoutPass();
  onFocusoutRePass();
  disableButton();

  return isPassSame;
}

function strongPassCheck() {
  var passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,16}$/;

  var pass = document.getElementById('password-input').value;

  if ((pass != "") && !pass.match(passRegex))
    isPassStrong = false;
  else
    isPassStrong = true;

  return isPassStrong;
}


function onFocusinEmail() {
  document.getElementById('email-input').style.outline = "none";
  document.getElementById('email-input').style.backgroundColor = "white";
}

function onFocusinName() {
  document.getElementById('name-input').style.outline = "none";
  document.getElementById('name-input').style.backgroundColor = "white";
}

function onFocusinPass() {
  document.getElementById('password-input').style.outline = "none";
  document.getElementById('password-input').style.backgroundColor = "white";
}

function onFocusinRePass() {
  document.getElementById('repassword-input').style.outline = "none";
  document.getElementById('repassword-input').style.backgroundColor = "white";
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

function onFocusoutName() {
  document.getElementById('name-input').style.backgroundColor = "#a3d4ec";
}

function onFocusoutPass() {
  if (!isPassSame || !isPassStrong) {
    document.getElementById('password-input').style.backgroundColor = "#eb9898";
    document.getElementById('password-input').style.outline = "2px solid red";
  }
  else {
    document.getElementById('password-input').style.outline = "none";
    document.getElementById('password-input').style.backgroundColor = "#a3d4ec";
  }
}

function onFocusoutRePass() {
  if (!isPassSame || !isPassStrong) {
    document.getElementById('repassword-input').style.backgroundColor = "#eb9898";
    document.getElementById('repassword-input').style.outline = "2px solid red";
  }
  else {
    document.getElementById('repassword-input').style.backgroundColor = "#a3d4ec";
    document.getElementById('repassword-input').style.outline = "none";
  }
}

function disableButton() {
  if (!isPassSame || isInvalidEmail || !isPassStrong) {
    document.getElementById('submit-button').disabled = true;
  }
  else {
    document.getElementById('submit-button').disabled = false;
  }
}

document.getElementById('email-input').addEventListener("focusin", onFocusinEmail);
document.getElementById('email-input').addEventListener("focusout", onFocusoutEmail);

document.getElementById('password-input').addEventListener("focusin", onFocusinPass);
document.getElementById('password-input').addEventListener("focusout", onFocusoutPass);

document.getElementById('name-input').addEventListener("focusin", onFocusinName);
document.getElementById('name-input').addEventListener("focusout", onFocusoutName);

document.getElementById('repassword-input').addEventListener("focusin", onFocusinRePass);
document.getElementById('repassword-input').addEventListener("focusout", onFocusoutRePass);
