import React, { useState } from 'react';
import './styles.css';

const apiKey = 'YOUR_API_KEY';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const getWeather = async () => {
    if (!city) {
      alert('Please enter a city name.');
      return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.cod !== 200) {
        alert(data.message);
        return;
      }

      setWeatherData(data);
    } catch (error) {
      alert('An error occurred while fetching weather data.');
      console.error(error);
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={getWeather}>Get Weather</button>

      {weatherData && (
        <div id="weatherInfo">
          <h2 id="cityName">{weatherData.name}</h2>
          <div id="weatherDetails">
            <div>Temperature: {weatherData.main.temp} °C</div>
            <div>Description: {weatherData.weather[0].description}</div>
            <div>Humidity: {weatherData.main.humidity}%</div>
            <div>Wind Speed: {weatherData.wind.speed} m/s</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
