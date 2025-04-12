import { chatSession } from "@/config/aiModel";
import {
  AI_PROMPT,
  SelectBudgetList,
  SelectTravelList,
} from "@/constants/options";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { assets } from "@/assets/assets";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import the hook for navigation

const FallbackDestination = ({ place, setPlace }) => {
  const [formData, setFormData] = useState({});
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedTraveller, setSelectedTraveller] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false); // loader state

  const navigate = useNavigate(); // hook to navigate

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

  // Main function to validate form, generate trip via AI, and then save it.
  const handleGenerateTrip = async () => {
    const localUser = localStorage.getItem("user");

    if (!localUser) {
      toast.error("Please sign in to generate a trip.");
      setOpenDialog(true);
      return;
    }

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

    setIsGenerating(true); // start loader

    // Prepare the prompt and call the AI model.
    const FINAL_PROMPT = AI_PROMPT
      .replace("{location}", formData.destination)
      .replace("{totalDays}", formData.days)
      .replace("{travellers}", formData.travellers)
      .replace("{budget}", formData.budget);

    console.log("Final Prompt:", FINAL_PROMPT);

    // Call your AI service to generate the trip.
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    const generatedTripText = await result?.response?.text();

    // Assume the AI returns a JSON string matching your generated trip schema.
    let generatedTrip;
    try {
      generatedTrip = JSON.parse(generatedTripText);
    } catch (error) {
      console.error("Error parsing generated trip JSON:", error);
      toast.error("Failed to parse the generated trip.");
      setIsGenerating(false);
      return;
    }

    // Optionally, you can add additional trip details from formData to generatedTrip.
    generatedTrip.tripDetails = {
      location: formData.destination,
      duration: `${formData.days} Days`,
      travelers: formData.travellers,
      budget: formData.budget,
    };

    console.log("Generated Trip:", generatedTrip);

    // Save the complete generated trip to MongoDB Cloud.
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/api/generated-trips",
        generatedTrip
      );
      console.log("Generated trip saved:", response.data);
      toast.success("Generated trip saved successfully!");

      // Navigate to the trip details page using the saved trip ID
      navigate(`/trip/${response.data._id}`);
    } catch (error) {
      console.error("Error saving generated trip:", error);
      toast.error("Failed to save generated trip.");
    } finally {
      setIsGenerating(false); // stop loader
    }
  };

  const login = useGoogleLogin({
    onSuccess: (res) => {
      console.log("Login response:", res);
      console.log("User before updating state:", user);
      try {
        GetUserProfile(res);
      } catch (error) {
        console.warn(
          "Error during login (possibly due to COOP restrictions):",
          error
        );
      }
    },
    onError: (err) => console.log("Login error:", err),
  });

  const GetUserProfile = async (res) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${res?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${res?.access_token}`,
            Accept: "application/json",
          },
        }
      );
      console.log("User info response:", response);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setOpenDialog(false);
      // After sign in, call handleGenerateTrip again.
      handleGenerateTrip();
    } catch (error) {
      console.log("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    console.log("Updated user state:", user);
  }, [user]);

  useEffect(() => {
    console.log("Form data:", formData);
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
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                "Generate Trip"
              )}
            </button>
          </div>

          {/* DIALOGUE */}
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogDescription>
                  <img src={assets.logo} alt="" className="w-10 " />
                  <h2 className="text-2xl text-center font-medium mt-7">
                    Sign in with Google
                  </h2>
                  <p className="text-gray-500 text-md text-center ">
                    To generate a trip, please sign in using your Google
                    account.
                  </p>

                  <button
                    onClick={() => {
                      console.log("Sign in clicked");
                      try {
                        login();
                      } catch (error) {
                        console.warn(
                          "Error during login (possibly due to COOP restrictions):",
                          error
                        );
                      }
                    }}
                    className="bg-blue-500 w-full text-white px-4 py-2 rounded-lg mt-7 flex items-center justify-center gap-2 hover:bg-blue-600 cursor-pointer"
                  >
                    <img src={assets.googleIcon} className="size-6" alt="" />
                    Sign in with Google
                  </button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default FallbackDestination;
