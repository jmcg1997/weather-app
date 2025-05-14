// Loader component: displays a spinning circle while data is loading
export default function Loader() {
  return (
    // Center the spinner horizontally and add top margin
    <div className="flex justify-center items-center mt-10">
      {/* Spinning circular loader using Tailwind utility classes */}
      <div className="w-12 h-12 border-4 border-blue-300 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}
