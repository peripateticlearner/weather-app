import { useState } from "react";
import axios from "axios";
import "./App.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("imperial"); // Default to Fahrenheit

  // Get API key from .env file
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async () => {
    setError(null);

    let url = "";

    if (zip) {
      url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&appid=${API_KEY}&units=${unit}`;
    } else if (city && country) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=${unit}`;
    } else {
      setError("Please enter either city & country or zip code.");
      return;
    }

    try {
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setWeather(null);
      setError("Location not found. Try again.");
    }
  };

  // Toggle Temperature Units
  const toggleUnit = () => {
    setUnit(unit === "imperial" ? "metric" : "imperial");
  };

  return (
    <div className="container">
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={zip !== ""}
      />
      <input
        type="text"
        placeholder="Enter country (e.g., US, GB, IN)"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter ZIP code"
        value={zip}
        onChange={(e) => setZip(e.target.value)}
        disabled={city !== ""}
      />

      <button onClick={fetchWeather}>Get Weather</button>

      {/* Toggle Button for Fahrenheit/Celsius */}
      <button className="toggle-btn" onClick={toggleUnit}>
        Switch to {unit === "imperial" ? "Celsius (°C)" : "Fahrenheit (°F)"}
      </button>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {weather.main.temp}°{unit === "imperial" ? "F" : "C"}</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;