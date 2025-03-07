import { assets } from "@/assets/assets";
import React from "react";

const NavBar = () => {
  return (
    <div className="p-3 px-5 shadow-sm flex justify-between items-center">
      <div>
        <img src={assets.logo} alt="" />
      </div>

      <div className="">
        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default NavBar;
