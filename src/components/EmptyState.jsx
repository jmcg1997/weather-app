import Lottie from "lottie-react";
import introAnimation from "../assets/animations/intro.json";
import cityAnimation from "../assets/animations/city.json";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center mt-10 mb-40">
      <Lottie
        animationData={introAnimation}
        autoplay
        loop
        style={{ width: "300px", height: "300px" }}
      />
      <p className="mt-10 text-lg text-gray-700 font-medium">
        Start by searching for a city
      </p>
      {/* <Lottie
        animationData={cityAnimation}
        autoplay
        loop
        style={{ width: "300px", height: "300px" }}
      /> */}
    </div>
  );
}

