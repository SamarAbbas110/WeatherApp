const apikey = "4f73fdd87a06578561b7a64992a7eee8";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const WeatherIcon = document.querySelector(".weather-icon");
const weatherContainer = document.querySelector(".weather");
const errorContainer = document.querySelector(".error");

async function checkWeather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    
    if (response.status === 404) {
        errorContainer.style.display = "block";
        weatherContainer.style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

        if (data.weather[0].main == "Clouds") {
            WeatherIcon.src = "Images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            WeatherIcon.src = "Images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            WeatherIcon.src = "Images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            WeatherIcon.src = "Images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            WeatherIcon.src = "Images/mist.png";
        } else if (data.weather[0].main == "Snow") {
            WeatherIcon.src = "Images/snow.png";
        }

        weatherContainer.style.display = "block";
        errorContainer.style.display = "none";
        weatherContainer.classList.add("shown"); // Add the 'shown' class for animation
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
