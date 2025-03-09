import React from "react";
import { Button } from "./components/ui/button";
import { Route, Routes } from "react-router-dom";
import CreateTrip from "./pages/CreateTrip";
import NotFound from "./components/custom/NotFound";
import Home from "./pages/Home";
import NavBar from "./components/custom/NavBar";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="">
      <Toaster />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        //404 routes
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
