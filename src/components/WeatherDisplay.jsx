import {
  Droplet,
  Wind,
  Sun,
  Eye,
  Cloud,
  Thermometer,
  Clock,
  GaugeCircle,
  ArrowUpCircle,
  ArrowDownCircle
} from "lucide-react";

export default function WeatherDisplay({ weather, unit }) {
  // Convert Unix timestamp + timezone offset to readable time
  const toLocalTime = (timestamp) => {
    const localDate = new Date((timestamp + weather.timezone) * 1000);
    return localDate.toUTCString().slice(-12, -7);
  };

  return (
    <div className="bg-black/20 backdrop-blur-md rounded-2xl shadow-xl p-8 mt-2 w-full max-w-md text-center border border-slate-200 transition hover:scale-105 hover:shadow-2xl">

      {/* City name */}
      <h2 className="text-3xl font-bold text-slate-800 mb-4">
        {weather.name}, {weather.sys.country}
      </h2>

      {/* Weather icon */}
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
        alt={weather.weather[0].description}
        className="w-40 h-40 mx-auto mb-4"
      />

      {/* Temperature */}
      <p className="text-5xl font-bold text-slate-900 mb-2">
        {Math.round(weather.main.temp)} °{unit === "metric" ? "C" : "F"}
      </p>

      {/* Feels like */}
      <p className="text-md text-slate-600 mb-4 flex justify-center items-center gap-2">
        <Thermometer className="w-5 h-5 text-red-700" style={{ fill: "currentColor", stroke: "currentColor" }} />
        Feels like: {Math.round(weather.main.feels_like)}°
        {unit === "metric" ? "C" : "F"}
      </p>

      {/* Description */}
      <p className="text-lg capitalize text-gray-700 mb-4">
        {weather.weather[0].description}
      </p>

      {/* Local time at the city */}
      <div className="flex items-center gap-2 justify-center col-span-2  text-gray-200 mt-4">
        <Clock className="w-5 h-5 text-black" />
        <span>Local time: {toLocalTime(weather.dt)}</span>
      </div>

      {/* Additional weather information */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-200 mt-6">

        {/* Min/Max Temperatures */}
        <div className="flex items-center gap-2 justify-center">
          <ArrowDownCircle className="w-5 h-5 text-blue-300" />
          <span>Min: {Math.round(weather.main.temp_min)}°{unit === "metric" ? "C" : "F"}</span>
        </div>

        <div className="flex items-center gap-2 justify-center">
          <ArrowUpCircle className="w-5 h-5 text-orange-400" />
          <span>Max: {Math.round(weather.main.temp_max)}°{unit === "metric" ? "C" : "F"}</span>
        </div>

        {/* Humidity */}
        <div className="flex items-center gap-2 justify-center">
          <Droplet className="w-5 h-5 text-blue-500" style={{ fill: "currentColor", stroke: "currentColor" }} />
          <span>{weather.main.humidity}% Humidity</span>
        </div>

        {/* Wind speed */}
        <div className="flex items-center gap-2 justify-center">
          <Wind className="w-5 h-5 text-white" />
          <span>
            {weather.wind.speed} {unit === "metric" ? "m/s" : "mph"} Wind
          </span>
        </div>

        {/* Visibility in kilometers */}
        <div className="flex items-center gap-2 justify-center">
          <Eye className="w-5 h-5 text-indigo-300" />
          <span>{(weather.visibility / 1000).toFixed(1)} km Visibility</span>
        </div>

        {/* Cloud coverage percentage */}
        <div className="flex items-center gap-2 justify-center">
          <Cloud className="w-5 h-5 text-gray-300" style={{ fill: "currentColor", stroke: "currentColor" }} />
          <span>{weather.clouds.all}% Clouds</span>
        </div>

        {/* Sunrise time */}
        <div className="flex items-center gap-2 justify-center">
          <Sun className="w-5 h-5 text-yellow-300" style={{ fill: "currentColor", stroke: "currentColor" }} />
          <span>Sunrise: {toLocalTime(weather.sys.sunrise)}</span>
        </div>

        {/* Sunset time */}
        <div className="flex items-center gap-2 justify-center">
          <Sun className="w-5 h-5 text-orange-400" style={{ fill: "currentColor", stroke: "currentColor" }} />
          <span>Sunset: {toLocalTime(weather.sys.sunset)}</span>
        </div>

        {/* Pressure */}
        <div className="flex items-center gap-2 justify-center col-span-2">
          <GaugeCircle className="w-5 h-5 text-slate-700" />
          <span>{weather.main.pressure} hPa Pressure</span>
        </div>

      </div>
    </div>
  );
}
