const apiKey = "1a62dc727ee2a1d5fa800a0ecf4fd2b5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weatherIcon");

async function checkWeather(city) {
    try { 
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            document.querySelector(".weather").style.display ="block";
            document.querySelector(".error").style.display = "none";
        }
        const data = await response.json();
        
        

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp * 10) / 10 + "°C";
        document.querySelector(".humidity").innerHTML = Math.round(data.main.humidity * 10) / 10 + "%";
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed * 10) / 10 + "km/h";
        if(data.weather[0].main == "Clouds") {
            weatherIcon.src = "/images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src ="/images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "/images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "/images/drizzle.png";
        } else if (data.weather[0].main == "Mist")  {
            weatherIcon.src = "/images/mist.png";
        }  else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "/images/snow.png";
        }

        

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name");
    }
});
