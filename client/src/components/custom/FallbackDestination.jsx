import { chatSession } from "@/config/aiModel";
import {
  AI_PROMPT,
  SelectBudgetList,
  SelectTravelList,
} from "@/constants/options";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const FallbackDestination = ({ place, setPlace }) => {
  const [formData, setFormData] = useState({});
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedTraveller, setSelectedTraveller] = useState(null);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for number inputs to only accept valid numbers.
  const handleNumberChange = (name, value) => {
    if (value === "") {
      handleInputChange(name, value);
      return;
    }
    const parsed = Number(value);
    if (!isNaN(parsed)) {
      handleInputChange(name, parsed);
    }
  };

  // Basic form validation and toast notifications.
  const handleGenerateTrip = async () => {
    if (!formData.destination || formData.destination.trim() === "") {
      toast.error("Destination is required.");
      return;
    }
    if (!formData.days || formData.days < 1) {
      toast.error("Please enter a valid number of days.");
      return;
    }
    if (!formData.budget) {
      toast.error("Please select a budget option.");
      return;
    }
    if (!formData.travellers) {
      toast.error("Please select who you are travelling with.");
      return;
    }
    toast.success("Form is valid, generating trip...");
    console.log("Form Data:", formData);
    // Proceed with generating the trip...

    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.destination)
      .replace("{totalDays}", formData?.days)
      .replace("{travellers}", formData?.travellers)
      .replace("{budget}", formData?.budget);

    // alert(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
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
        {/* Destination */}
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
        {/* Days */}
        <div>
          <div className="text-xl my-3 font-medium">
            How many days are you planning the trip?
          </div>
          <div>
            <input
              type="number"
              placeholder="Eg. 4"
              min="1"
              value={formData.days || ""}
              onChange={(e) => handleNumberChange("days", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>
        {/* Budget */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 cursor-pointer">
            {SelectBudgetList.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedBudget(index);
                  handleInputChange("budget", item.title);
                }}
                className={`p-4 border rounded-lg hover:shadow-md ${
                  selectedBudget === index ? "border-blue-500 shadow-lg" : ""
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-medium">{item.title}</h2>
                <h2 className="text-lg text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        {/* Travellers */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on travelling with?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 cursor-pointer">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedTraveller(index);
                  handleInputChange("travellers", item.title);
                }}
                className={`p-4 border rounded-lg hover:shadow-md ${
                  selectedTraveller === index ? "border-blue-500 shadow-lg" : ""
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-medium">{item.title}</h2>
                <h2 className="text-lg text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleGenerateTrip}
              className="my-20 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              Generate Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FallbackDestination;
