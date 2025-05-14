export default function Forecast({ forecastData, unit }) {
  return (
    <div className="mt-8 w-full max-w-2xl">
      {/* Section Title */}
      <h3 className="text-2xl font-bold text-blue-800 text-center mb-6">5-Day Forecast</h3>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 gap-2">
        {forecastData.map((item) => (
          <div
            key={item.dt}
            className="bg-black/30 backdrop-blur-md rounded-2xl shadow-xl p-5 text-center flex flex-col items-center transition-all hover:scale-105 hover:shadow-2xl border border-slate-200"
          >
            {/* Weekday label */}
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              {new Date(item.dt_txt).toLocaleDateString(undefined, {
                weekday: "long",
              })}
            </p>

            {/* Weather icon */}
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
              className="w-16 h-16 mb-2"
            />

            {/* Temperature */}
            <p className="text-lg font-bold text-gray-800 dark:text-white">
              {Math.round(item.main.temp)} °{unit === "metric" ? "C" : "F"}
            </p>

            {/* Weather description */}
            <p className="capitalize text-sm text-gray-600 dark:text-gray-300 mt-1">
              {item.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
