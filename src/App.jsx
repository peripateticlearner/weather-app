import { useState } from "react";
import "./App.css"; 

const WeatherApp = () => {
  const [city, setCity] = useState("");

  return (
    <div className="container">
      <h1>Weather App</h1>
      <input 
        type="text" 
        placeholder="Enter city" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
      />
      <button>Get Weather</button>
    </div>
  );
};

export default WeatherApp;
