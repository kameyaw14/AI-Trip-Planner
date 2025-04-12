import { assets } from "@/assets/assets";
import { AppContextInstance } from "@/contexts/AppContext";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
const {app,user,setUser} = AppContextInstance()

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();



  return (
    <nav className="p-3 px-5 shadow-sm flex justify-between items-center relative">

      <div onClick={() => {navigate("/")}} className="cursor-pointer">
        <img src={assets.logo} alt="Logo" className="h-8 md:h-10" />
      </div>
      

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-black focus:outline-none"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Navigation Items */}
      <div
        className={`
          flex flex-col md:flex-row absolute md:static
          top-full left-0 w-full md:w-auto bg-white md:bg-transparent
          transition-all duration-300 ${menuOpen ? "block" : "hidden"} md:block
          md:items-center
        `}
      >
       {! user ? <button className="m-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          Sign In 
        </button> : <Link to={'/generated-trips'}>
        <button  className="m-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          Trips
        </button></Link>}
      </div>
    </nav>
  );
};

export default NavBar;
