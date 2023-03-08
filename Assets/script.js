// Unique api key
const APIKey = "1338ae7edac2a6e4e79a1535abeb34a6";

function initPage() {
const cityEl = document.getElementById("search-city");
const searchEl = document.getElementById("search-button");
const clearEl = document.getElementById("clear-history");
const nameEl = document.getElementById("city-name");
const currentPicEl = document.getElementById("city-pic");
const currentTempEl = document.getElementById("temp");
const currentHumidityEl = document.getElementById("humidity");
const currentWindEl = document.getElementById("wind");
const currentUVEl = document.getElementById("UV");
const historyEl = document.getElementById("history");
var fivedayEl = document.getElementById("5day-header");
var todayweatherEL = document.getElementById("today-weather");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

// Display current weather
function getWeather(cityname) {
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    fetch(queryURL)
    .then(function (response) {
        todayweatherEL.classList.remove("d-none");
        const currentDate = new Date(response.data.dt * 1000);
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
        currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp);
        currentHumidityEl.innerHTML = "Humidity: " + response.data.humidity + "%";
        currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + "MPH";
        
    });
}

let cityID = response.data.id;
let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
    fetch(forecastQueryURL)
    .then(function (response) {
        fivedayEl.classList.remove("d-none");
    const forecastEls = document.querySelectorAll(".forecast");
        for (i = 0; i < forecastEls.length; i++) {
            forecastEls[i].innerHTML
            const forecastIndex = i * 8 + 4;
            const forecastDay = forecastDate.getDate();
            const forecastMonth = forecastDate.getMonth();
            const forecastYear = forecastDate.getFullYear();
            const forecastDateEl = document.createElement("p");
            forecastDateEl.setAttribute("class", "my-3 mb-0 forecast-date");
            forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
            forecastEls[i].append(forecastDatEl);
        }

        function k2f(K) {
            return Math.floor((K - 273.15) * 1.8 + 32);
        }

    });
    searchEl.addEventListener("click", function () {
      const searchTerm = cityEl.value;
      getWeather(searchTerm);
      searchHistory.push(searchTerm);
      localStorage.setItem("search", JSON.stringify(searchHistory));
      renderSearchHistory();
    })

    clearEl.addEventListener("click", function () {
        localStorage.clear();
        searchHistory = [];
        renderSearchHistory();
    })

    function renderSearchHistory() {
        historyEl.innerHTML = "";
        for (let i = 0; i < searchHistory.length; i++) {
            const historyItem = document.createElement("input");
            historyItem.setAttribute("type", "text");
            historyItem.setAttribute("readonly", true);
            historyItem.setAttribute("class", "form-control d-block bg-white");
            historyItem.setAttribute("value", searchHistory[i]);
            historyItem.addEventListener("click", function() {
                getWeather(historyItem.value);
            })
            historyEl.append(historyItem);
        }
    }

    renderSearchHistory();
    if (searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);
    }
}
initPage();