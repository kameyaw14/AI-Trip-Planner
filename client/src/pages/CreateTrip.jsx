import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const CreateTrip = () => {
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-medium text-3xl">
        Tell us about your travel preferences
      </h2>
      <p className=" mt-3 text-gray-500 text-xl">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero officiis
        molestias mollitia quidem? Eos, magni.
      </p>

      <div className=" mt-20">
        <div>
          <h2 className=" text-xl my-3 font-medium">
            What is your preferred destination?
          </h2>
          {/* <GooglePlacesAutocomplete apiKey="" /> */}
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
