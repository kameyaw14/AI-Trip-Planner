import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 gap-9 mt-16">
      <h1 className="font-medium text-3xl sm:text-4xl md:text-5xl text-center">
        <span className="text-green-500">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.{" "}
        </span>
        Totam, voluptatum. Maiores quisquam minima numquam incidunt!
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-500 text-center max-w-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
        sequi, harum laboriosam quibusdam fugit laborum fuga ab recusandae
        consequatur provident.
      </p>
<div className="flex gap-10">
  <Link to="/create-trip">
        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          Get Started, It's Free
        </button>
        
      </Link>

      <Link to="generated-trips">
        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          Generated Trips
        </button>
        
      </Link>
</div>
      
    </div>
  );
};

export default Hero;
