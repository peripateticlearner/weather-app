import { useState } from "react";
import axios from "axios";
import "./App.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("imperial"); 
  const [loading, setLoading] = useState(false); 

  // API Key from .env file
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async () => {
    setError(null);
    setWeather(null); // Clear previous weather data
    setLoading(true);

    let url = "";

    if (zip) {
      url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&appid=${API_KEY}&units=${unit}`;
    } else if (city && country) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=${unit}`;
    } else {
      setError("Please enter either city & country or ZIP code.");
      setLoading(false);
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

    setLoading(false);
  };

  // Toggle Temperature Units
  const toggleUnit = () => {
    setUnit(unit === "imperial" ? "metric" : "imperial");
  };

  return (
    <div className="container">
      <h1>Weather App</h1>

      {/* Display error message above weather info */}
      {error && <p className="error">{error}</p>}

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          setZip(""); // Clear ZIP when typing city
        }}
        disabled={zip !== "" || loading}
      />
      <input
        type="text"
        placeholder="Enter country (e.g., US, GB, IN)"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        disabled={loading}
      />
      <input
        type="text"
        placeholder="Enter ZIP code"
        value={zip}
        onChange={(e) => {
          setZip(e.target.value);
          setCity(""); // Clear city when typing ZIP
        }}
        disabled={city !== "" || loading}
      />

      <button onClick={fetchWeather} disabled={loading}>
        {loading ? "Fetching..." : "Get Weather"}
      </button>

      {/* Toggle Button for Fahrenheit/Celsius */}
      <button className="toggle-btn" onClick={toggleUnit} disabled={loading}>
        Switch to {unit === "imperial" ? "Celsius (°C)" : "Fahrenheit (°F)"}
      </button>

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
