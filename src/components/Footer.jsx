export default function Footer() {
    return (
      <footer className="w-full text-center py-6 mt-10 text-gray-600 text-sm border-t border-slate-300 bg-white/30 backdrop-blur-md">
        <p>
          © {new Date().getFullYear()} Weather App by Jesus M. Camacho — Built with React & Tailwind CSS
        </p>
      </footer>
    );
  }
  