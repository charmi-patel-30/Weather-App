import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import search_icon from "../assets/search.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (!city) {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
        description: data.weather[0].description,
      });
    } catch (error) {
      setWeatherData(null);
      console.error("Error fetching weather data", error);
    }
  };

  useEffect(() => {
    search("Vadodara");
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1 className="app-name"></h1>
        <div className="search-bar">
          <input ref={inputRef} type="text" placeholder="Enter city" />
          <img
            src={search_icon}
            alt="search icon"
            onClick={() => search(inputRef.current.value)}
          />
        </div>
      </header>

      {/* Main Weather Info */}
      <main className="weather-container">
        {weatherData ? (
          <>
            <div className="weather-details">
              <img
                src={weatherData.icon}
                alt="weather icon"
                className="weather-icon"
              />
              <h2 className="temperature">{weatherData.temperature}°C</h2>
              <h3 className="location">{weatherData.location}</h3>
              <p className="description">{weatherData.description}</p>

              <div className="additional-info">
                <div className="info">
                  <img src={humidity_icon} alt="humidity icon" />
                  <p>{weatherData.humidity} %</p>
                  <span>Humidity</span>
                </div>
                <div className="info">
                  <img src={wind_icon} alt="wind icon" />
                  <p>{weatherData.windSpeed} Km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Loading weather information...</p>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} Weather App. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Weather;
