const timezone = document.getElementById("timezone");
const address = document.getElementById("address");
const submit = document.getElementById("submit");
const resultDiv = document.getElementById("resultDiv");
const finalDiv = document.getElementById("finalDiv");
const error = document.getElementById("error");
const timezoneError = document.getElementById("timezoneError");

submit.addEventListener("click", showResult);
document.addEventListener("DOMContentLoaded", getLocation);

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

async function showPosition(position) {
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=f6b7f680c3d347acb392c52fd0179873`;
    const res = await fetch(url);
    const data = await res.json();
    timezone.innerHTML = `
    <p>Name of Time Zone: ${data.results[0].timezone.name}</p>
    <div class="flexDiv">
        <p>Lat: ${position.coords.latitude}</p>
        <p>Long: ${position.coords.longitude}</p>
    </div>
    <p>Offset STD: ${data.results[0].timezone.offset_STD}</p>
    <p>Offset STD Seconds: ${data.results[0].timezone.offset_STD_seconds}</p>
    <p>Offset DST: ${data.results[0].timezone.offset_DST}</p>
    <p>Country: ${data.results[0].country}</p>
    <p>Postcode: ${data.results[0].postcode}</p>
    <p>City: ${data.results[0].city}</p>
    `
}

async function showResult() {
    if (address.value.trim() == "") {
        timezoneError.style.display = "none";
        error.style.display = "block";
        return;
    }
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${address.value}&appid=b03c095174f023baf565602eeecf6c08`;
    const res = await fetch(url);
    const info = await res.json();
    console.log(info);
    if (info.length == 0) {
        error.style.display = "none";
        timezoneError.style.display = "block";
        return;
    }
    const link = `https://api.geoapify.com/v1/geocode/reverse?lat=${info[0].lat}&lon=${info[0].lon}&format=json&apiKey=f6b7f680c3d347acb392c52fd0179873`;
    const response = await fetch(link);
    const data = await response.json();
    resultDiv.innerHTML = `
    <p>Name of Time Zone: ${data.results[0].timezone.name}</p>
    <div class="flexDiv">
        <p>Lat: ${info[0].lat}</p>
        <p>Long: ${info[0].lon}</p>
    </div>
    <p>Offset STD: ${data.results[0].timezone.offset_STD}</p>
    <p>Offset STD Seconds: ${data.results[0].timezone.offset_STD_seconds}</p>
    <p>Offset DST: ${data.results[0].timezone.offset_DST}</p>
    <p>Country: ${data.results[0].country}</p>
    <p>Postcode: ${data.results[0].postcode}</p>
    <p>City: ${data.results[0].city}</p>
    `
    error.style.display = "none";
    timezoneError.style.display = "none";
    finalDiv.style.display = "block";
}