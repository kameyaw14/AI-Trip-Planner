import FallbackDestination from "@/components/custom/FallbackDestination";
import { SelectBudgetList, SelectTravelList } from "@/constants/options";
import { useGoogleLogin } from "@react-oauth/google";
import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const useLoadScript = (src) => {
  const [loaded, setLoaded] = useState(false);

  const [formData, setFormData] = useState([]);

  const handleInputChange = (name, value) => {};

  useEffect(() => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [src]);

  return loaded;
};

const CreateTrip = () => {
  const [place, setPlace] = useState("");
  // Get your API key from your environment variables
  const apiKey = import.meta.VITE_GOOGLE_PLACE_API;

  // If there is no API key, we can show a fallback UI.
  if (!apiKey) {
    return <FallbackDestination setPlace={setPlace} place={place} />;
  }

  // Load the Google script dynamically.
  const googleScriptLoaded = useLoadScript(
    `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
  );

  if (!googleScriptLoaded) {
    return <div>Loading...</div>;
  }

  const GoogleLogin = useGoogleLogin({
    onSuccess: (res) => console.log(res),
    onError: (err) => console.log(err),
  });

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-medium text-3xl">
        Tell us about your travel preferences
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero officiis
        molestias mollitia quidem? Eos, magni.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your preferred destination?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={apiKey}
            selectProps={{
              place,
              onChange: (input) => {
                setPlace(input);
                handleInputChange("destination", input);
              },
              placeholder: "Enter your destination",
            }}
          />
        </div>

        <div className=" text-xl my-3 font-medium">
          How many days are you planning the trip?
          <div>
            <input
              type="number"
              placeholder="Enter a value"
              className=" w-full border rounded-md p-2"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">What is your Budjet?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 cursor-pointer">
            {SelectBudgetList.map((item, index) => (
              <div
                key={index}
                className=" p-4 border rounded-lg hover:shadow-md "
              >
                <h2 className=" text-4xl">{item.icon}</h2>
                <h2 className=" font-medium">{item.title}</h2>
                <h2 className=" text-lg text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on travelling with?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 cursor-pointer">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                className=" p-4 border rounded-lg hover:shadow-md "
              >
                <h2 className=" text-4xl">{item.icon}</h2>
                <h2 className=" font-medium">{item.title}</h2>
                <h2 className=" text-lg text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>

          <div className="justify-end flex ">
            <button className="my-20 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 ">
              Generate Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
