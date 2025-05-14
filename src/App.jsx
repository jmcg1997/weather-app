import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Forecast from "./components/Forecast";
import Loader from "./components/Loader";
import UnitToggle from "./components/UnitToggle";
import WeatherDisplay from "./components/WeatherDisplay";
import EmptyState from "./components/EmptyState";
import Footer from "./components/Footer";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("metric"); // Units for temperature: "metric" = °C, "imperial" = °F
  const [lastCity, setLastCity] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  // API key from .env file
  const API_KEY = import.meta.env.VITE_API_KEY;

  // Function to fetch current weather and forecast data
  const fetchWeather = async (city, silent = false) => {
    try {
      if (!silent) setLoading(true);
      setError(null);
      setWeather(null);
      setForecast([]);

      // 1. Fetch current weather
      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
      );
      if (!currentRes.ok) throw new Error("City not found");
      const currentData = await currentRes.json();
      setWeather(currentData);

      // 2. Fetch 5-day forecast
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit}`
      );
      if (!forecastRes.ok) throw new Error("Forecast not found");
      const forecastData = await forecastRes.json();

      // Filter forecast to only 12:00 p.m. data entries (1 per day)
      const daily = forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      setForecast(daily);
      setLastCity(city);
      if (!silent) setLoading(false);
    } catch (err) {
      setError(err.message);
      if (!silent) setLoading(false);
    }
  };

  // Refetch data when temperature unit changes using last city searched
  useEffect(() => {
    if (lastCity) {
      fetchWeather(lastCity, true); // Silent fetch to avoid triggering loader in UI
    }
  }, [unit]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br items-center from-slate-300 to-slate-500 md:pt-10">
      <main className="flex flex-col items-center justify-center w-full max-w-3xl">

        {/* App title */}
        <h1 className="text-3xl font-bold mb-6 text-blue-900">🌦️ Weather App</h1>

        {/* Search bar */}
        <SearchBar onSearch={fetchWeather} loading={loading} hasError={!!error} />

        {/* Unit toggle */}
        <UnitToggle unit={unit} onToggle={() => setUnit(unit === "metric" ? "imperial" : "metric")} />

        {/* Loader and error message */}
        {loading && <Loader />}

        {error && !loading && (
          <div className="text-red-600 font-medium mt-4">{error}</div>
        )}
        {/* Weather display */}
        {weather && !loading && (
          <WeatherDisplay weather={weather} unit={unit} />
        )}
        {!weather && !forecast.length && <EmptyState />}

        {/* 5-day Forecast */}
        {forecast.length > 0 && !loading && (
          <Forecast forecastData={forecast} unit={unit} />
        )}
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
