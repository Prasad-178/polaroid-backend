console.log("nav js")

const url = "http://localhost:3500"
console.log(location.href)
if (window.location.href == url+'/') {
    console.log("home")
    document.getElementById("home").classList.add("active")
}

if (window.location.href == url+'/films') {
    console.log("films")
    document.getElementById("films").classList.add("active")
}

if (window.location.href == url+'/lists') {
    console.log("lists")
    document.getElementById("lists").classList.add("active")
}
