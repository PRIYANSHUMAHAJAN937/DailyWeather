// Making an object of weatherapi
const weatherApi = {
    key: '4eb3703790b356562054106543b748b2',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
}

// Adding event listener for key press of Enter
let searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        getWeatherReport(searchInputBox.value);
    }
})

// Get weather report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(showWeatherReport);
}

// Show weather report
function showWeatherReport(weather) {
    let city_code = weather.cod;
    if (city_code === '400') {
        swal("Empty Input", "Please enter any city", "error");
        reset();
    } else if (city_code === '404') {
        swal("Bad Input", "Entered city didn't match", "warning");
        reset();
    } else {
        let op = document.getElementById('weather-body');
        op.style.display = 'block';
        let todayDate = new Date();
        let parent = document.getElementById('parent');
        let weather_body = document.getElementById('weather-body');
        weather_body.innerHTML = `
            <div class="location-details">
                <div class="city" id="city">${weather.name}, ${weather.sys.country}</div>
                <div class="date" id="date">${dateManage(todayDate)}</div>
            </div>
            <div class="weather-status">
                <div class="temp" id="temp">${Math.round(weather.main.temp)}&deg;C</div>
                <div class="weather" id="weather">${weather.weather[0].main} <i class="${getIconClass(weather.weather[0].main)}"></i></div>
                <div class="min-max" id="min-max">${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)</div>
                <div id="updated_on">Updated as of ${getTime(todayDate)}</div>
            </div>
            <hr>
            <div class="day-details">
                <div class="basic">Feels like ${weather.main.feels_like}&deg;C | Humidity ${weather.main.humidity}%<br>Pressure ${weather.main.pressure} mb | Wind ${weather.wind.speed} KMPH</div>
            </div>
        `;
        parent.append(weather_body);
        changeBg(weather.weather[0].main);
        reset();
    }
}

// Get the current time
function getTime(todayDate) {
    let hour = addZero(todayDate.getHours());
    let minute = addZero(todayDate.getMinutes());
    return `${hour}:${minute}`;
}

// Manage the current date
function dateManage(dateArg) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    return `${date} ${month} (${day}), ${year}`;
}

// Function to change background and weather-body color according to weather status
function changeBg(status) {
    let weatherBody = document.getElementById('weather-body');
    switch (status) {
        case 'Clouds':
            document.body.style.backgroundImage = 'url(images/clouds.jpg)';
            weatherBody.style.background = 'linear-gradient(to top, #bdc3c7, #2c3e50)'; // Grey for clouds
            break;
        case 'Rain':
            document.body.style.backgroundImage = 'url(images/rain.jpg)';
            weatherBody.style.background = 'linear-gradient(to top, #00c6ff, #0072ff)'; // Blue for rain
            break;
        case 'Clear':
            document.body.style.backgroundImage = 'url(images/clear.jpg)';
            weatherBody.style.background = 'linear-gradient(to top, #fceabb, #f8b500)'; // Yellow for clear
            break;
        case 'Snow':
            document.body.style.backgroundImage = 'url(images/snow.jpg)';
            weatherBody.style.background = 'linear-gradient(to top, #e6dada, #274046)'; // Light grey for snow
            break;
        case 'Sunny':
            document.body.style.backgroundImage = 'url(images/sunny.jpg)';
            weatherBody.style.background = 'linear-gradient(to top, #ffe259, #ffa751)'; // Yellow for sunny
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url(images/thunder.jpg)';
            weatherBody.style.background = 'linear-gradient(to top, #3a7bd5, #3a6073)'; // Dark blue for thunderstorm
            break;
        case 'Drizzle':
            document.body.style.backgroundImage = 'url(images/drizzle.jpg)';
            weatherBody.style.background = 'linear-gradient(to top, #4facfe, #00f2fe)'; // Light blue for drizzle
            break;
        case 'Mist':
        case 'Haze':
        case 'Fog':
            document.body.style.backgroundImage = 'url(images/mist.jpg)';
            weatherBody.style.background = 'linear-gradient(to top, #757f9a, #d7dde8)'; // Grey for mist/haze/fog
            break;
        default:
            document.body.style.backgroundImage = 'url(images/bg.jpg)';
            weatherBody.style.background = 'linear-gradient(to top, #42a5f5, #64b5f6)'; // Default blue color
    }
}


// Function to get icon class based on weather
function getIconClass(classarg) {
    switch (classarg) {
        case 'Rain':
            return 'fas fa-cloud-showers-heavy';
        case 'Clouds':
            return 'fas fa-cloud';
        case 'Clear':
            return 'fas fa-cloud-sun';
        case 'Snow':
            return 'fas fa-snowman';
        case 'Sunny':
            return 'fas fa-sun';
        case 'Mist':
            return 'fas fa-smog';
        case 'Thunderstorm':
        case 'Drizzle':
            return 'fas fa-thunderstorm';
        default:
            return 'fas fa-cloud-sun';
    }
}

function reset() {
    let input = document.getElementById('input-box');
    input.value = "";
}

// Function to add zero if hour and minute less than 10
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
