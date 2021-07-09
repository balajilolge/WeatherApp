//https://api.openweathermap.org/data/2.5/weather?q={city}&appid=276b320107f9eeeea3897bfee0076876
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const weatherApi = {
    key: "276b320107f9eeeea3897bfee0076876",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox = document.getElementById('input-box');

// Event Listner Function on Keypress

searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
    }

});

// Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(showWeatherReport);
}

// Show Weather Report
function showWeatherReport(weather) {
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name},${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minmaxtemp = document.getElementById('min-max');
    minmaxtemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let weathertype = document.getElementById('weather');
    weathertype.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if (weathertype.textContent == 'Clouds') {
        document.body.style.backgroundImage = "url(https://media.giphy.com/media/lOkbL3MJnEtHi/giphy.gif)", "url(img02-cloudy.jpg)"
    }
    else if (weathertype.textContent == 'Clear') {
        document.body.style.backgroundImage = "url(img01-clear.jpg)"
    }
    else if (weathertype.textContent == 'Rain') {
        document.body.style.backgroundImage = "url(https://media.giphy.com/media/t7Qb8655Z1VfBGr5XB/giphy.gif)", "url(img04-rainy.jpg)"
    }
    else if (weathertype.textContent == 'Haze') {
        document.body.style.backgroundImage = "url(img05-haze.jpg)"
    }
    else if (weathertype.textContent == 'Thunderstorm') {
        document.body.style.backgroundImage = "url(https://media.giphy.com/media/iN6lLmUb8exMI/giphy.gif)", "url(img06-thunderstorm.jpg)"
    }
    else if (weathertype.textContent == 'Sunny') {
        document.body.style.backgroundImage = "url(img03-sunny.jpg)"
    }
}

// Date manage
function dateManage(dateArg) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
        "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}





