import React from "react";
import { Button } from "./components/ui/button";
import { Route, Routes } from "react-router-dom";
import CreateTrip from "./pages/CreateTrip";
import NotFound from "./components/custom/NotFound";
import Home from "./pages/Home";
import NavBar from "./components/custom/NavBar";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginTest from "./pages/GoogleLoginTest";
import DisplayGeneratedTrips from "./pages/DisplayGeneratedTrips";
import TripDetail from "./pages/TripDetail";

const App = () => {
  const clientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;
  // console.log(clientId);

  return (
    <div className="">
      <GoogleOAuthProvider clientId={clientId}>
        <Toaster />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/test-google" element={<GoogleLoginTest />} />
          <Route path="/generated-trips" element={<DisplayGeneratedTrips />} />
          <Route path="/trip/:id" element={<TripDetail />} />
          //404 routes
          <Route path="*" element={<NotFound />} />
        </Routes>
      </GoogleOAuthProvider>
    </div>
  );
};

export default App;
