document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityName = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");


    const API_KEY = "include your api key here"

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) return ""


        try {
            const weatherData = await fetchWeatherData(city)
            displayWeatherData(weatherData)
        } catch (error) {
            showError()
        }
    })


    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        
        const response = await fetch(url)

        if(!response.ok){
            throw new Error(`Response status: ${response.status}`)
        }

          return await response.json(); // ✅ return parsed JSON
}

    async function displayWeatherData(weatherData) {
        cityName.textContent = weatherData.name
        temperatureDisplay.textContent = `${weatherData.main.temp} °C`
        descriptionDisplay.textContent = weatherData.weather[0].description

        errorMessage.classList.add('hidden');
        weatherInfo.classList.remove('hidden');
    }

        function showError() {
        weatherInfo.classList.add('hidden')
        errorMessage.classList.remove('hidden')
    }
    })