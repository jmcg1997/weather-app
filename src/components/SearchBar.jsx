import { useState } from "react";

// Search bar component
export default function SearchBar({ onSearch, loading, hasError }) {
  const [city, setCity] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent empty input or multiple submissions while loading
    if (!city.trim() || loading) return;

    // Trigger the search function passed as a prop
    onSearch(city);

    // Clear input field after search
    setCity("");
  };

  return (
    // Search form with input and submit button
    <form onSubmit={handleSubmit} className="flex items-center gap-4 mb-6">

      {/* Text input for city name */}
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city..."
        className={`px-5 py-3 w-72 bg-white/90 shadow-md border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 text-gray-800 backdrop-blur-sm 
          ${hasError ? "animate-[shake_0.3s_ease]" : "border border-gray-300 focus:ring-blue-400"}`}
      />

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className={`px-5 py-3 rounded-xl shadow transition-all font-medium text-white ${loading
          ? "bg-blue-300 cursor-wait"
          : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg cursor-pointer"
          }`}
      >
        {/* Display "Searching..." if loading, otherwise "Search" */}
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}


