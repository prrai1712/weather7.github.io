// Replace 'YOUR_API_KEY' with your actual API key from the weather API provider
const apiKey = '7968a7b78d95e3aecb22bd624dab291d';
const weatherInfo = document.getElementById('weatherInfo');
const cityNameElement = document.getElementById('cityName');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('windSpeed');

async function getWeather() {
    const cityInput = document.getElementById('cityInput').value.trim();

    if (!cityInput) {
        alert('Please enter a city name.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod !== 200) {
            alert(data.message);
            return;
        }

        cityNameElement.textContent = data.name;
        temperatureElement.textContent = `Temperature: ${data.main.temp} °C`;
        descriptionElement.textContent = `Description: ${data.weather[0].description}`;
        humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;

        weatherInfo.classList.remove('hidden');
    } catch (error) {
        alert('An error occurred while fetching weather data.');
        console.error(error);
    }
}
