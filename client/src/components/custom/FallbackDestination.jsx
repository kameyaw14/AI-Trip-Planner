import { SelectBudgetList, SelectTravelList } from "@/constants/options";
import React, { useEffect, useState } from "react";

const FallbackDestination = ({ place, setPlace }) => {
  const [formData, setFormData] = useState([]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

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
          <input
            type="text"
            placeholder="Enter your destination"
            value={place}
            onChange={(e) => {
              setPlace(e.target.value);
              handleInputChange("destination", e.target.value);
            }}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
          <p className="mt-2 text-red-500">
            API key is missing. Google Places functionality is disabled. Please
            enter your destination manually.
          </p>
        </div>
        <div>
          <div className=" text-xl my-3 font-medium">
            How many days are you planning the trip?
          </div>

          <div>
            <input
              type="number"
              placeholder="Eg. 4 "
              onChange={(e) => handleInputChange("days", e.target.value)}
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
                onClick={() => handleInputChange("budget", item.title)}
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
                onClick={() => handleInputChange("travellers", item.title)}
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

export default FallbackDestination;
