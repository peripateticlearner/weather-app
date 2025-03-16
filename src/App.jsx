import { useState } from "react";
import axios from "axios";
import "./App.css"; 

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  // Get API key from .env file
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      
    } catch (error) {
      console.error("Error fetching weather:", error);
      setWeather(null);
      setError("City not found. Try again.");
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <input 
        type="text" 
        placeholder="Enter city" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
