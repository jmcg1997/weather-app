export default function UnitToggle({ unit, onToggle }) {
  const isMetric = unit === "metric";

  return (
    <div className="mb-6">
      <div
        onClick={onToggle}
        className={`w-20 h-10 rounded-full flex items-center px-1 cursor-pointer transition-all duration-300 ${isMetric ? "bg-blue-200" : "bg-gray-200"
          } shadow-inner border border-gray-300`}
      >
        {/* Knob */}
        <div
          className={`w-8 h-8 rounded-full bg-white shadow-md transform transition-transform duration-300 ${isMetric ? "translate-x-0" : "translate-x-10"
            }`}
        ></div>
        {/* Labels */}
        <div className="absolute w-18 flex justify-between text-sm font-semibold text-gray-700 px-2 pointer-events-none">
          <span className={`${isMetric ? "text-blue-600" : "text-gray-400 opacity-60"}`}>°C</span>
          <span className={`${!isMetric ? "text-gray-500" : "text-blue-400 opacity-60"}`}>°F</span>
        </div>
      </div>
    </div>
  );
}
