var isPassSame = true;
var isPassStrong = true;

function validateForm() {
  var passValidation = checkPassword();
  var passStrength = strongPassCheck();

  if (passValidation === false) {
    document.getElementById('alert-zone').innerHTML = "Password does not match";
  }
  else if(passStrength === false) {
  	document.getElementById('alert-zone').innerHTML = "Please enter strong password";
  }
  else {
    document.getElementById('alert-zone').innerHTML = "";
  }

  return passValidation && passStrength;
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

function onFocusinPass() {
  document.getElementById('password-input').style.outline = "none";
  document.getElementById('password-input').style.backgroundColor = "#789";
}

function onFocusinRePass() {
  document.getElementById('repassword-input').style.outline = "none";
  document.getElementById('repassword-input').style.backgroundColor = "#789";
}

function onFocusoutPass() {
  if (!isPassSame || !isPassStrong) {
    document.getElementById('password-input').style.backgroundColor = "#eb9898";
    document.getElementById('password-input').style.outline = "2px solid red";
  }
  else {
    document.getElementById('password-input').style.outline = "none";
    document.getElementById('password-input').style.backgroundColor = "#456";
  }
}

function onFocusoutRePass() {
  if (!isPassSame || !isPassStrong) {
    document.getElementById('repassword-input').style.backgroundColor = "#eb9898";
    document.getElementById('repassword-input').style.outline = "2px solid red";
  }
  else {
    document.getElementById('repassword-input').style.backgroundColor = "#456";
    document.getElementById('repassword-input').style.outline = "none";
  }
}

function disableButton() {
  if (!isPassSame || !isPassStrong) {
    document.getElementById('submit-button').disabled = true;
  }
  else {
    document.getElementById('submit-button').disabled = false;
  }
}

document.getElementById('password-input').addEventListener("focusin", onFocusinPass);
document.getElementById('password-input').addEventListener("focusout", onFocusoutPass);

document.getElementById('repassword-input').addEventListener("focusin", onFocusinRePass);
document.getElementById('repassword-input').addEventListener("focusout", onFocusoutRePass);
