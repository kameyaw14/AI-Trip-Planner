const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = import.meta.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// async function run() {
export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a detailed travel plan in JSON format for the following scenario:\n\n- Location: Las Vegas\n- Duration: 3 Days\n- Travelers: A couple\n- Budget: Cheap\n\nRequirements:\n1. Provide a list of recommended hotels, each with:\n   - Hotel Name\n   - Hotel Address\n   - Price (per night)\n   - Hotel Image URL\n   - Geo Coordinates\n   - Rating\n   - Description\n\n2. Suggest a daily itinerary covering 3 days, each day including:\n   - Place Name\n   - Place Details\n   - Place Image URL\n   - Geo Coordinates\n   - Ticket Pricing\n   - Best Time to Visit\n   - Travel Time to/from each location\n\nOutput everything in valid JSON format, with clear structure for the hotels list and the daily itinerary plan.\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "tripDetails": {\n    "location": "Las Vegas",\n    "duration": "3 Days",\n    "travelers": "Couple",\n    "budget": "Cheap"\n  },\n  "hotels": [\n    {\n      "hotelName": "Circus Circus Hotel & Casino",\n      "hotelAddress": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",\n      "price": 45,\n      "hotelImageURL": "https://example.com/circus_circus.jpg",\n      "geoCoordinates": {\n        "latitude": 36.1265,\n        "longitude": -115.1634\n      },\n      "rating": 3.5,\n      "description": "Affordable option with a circus theme, indoor amusement park, and multiple dining choices."\n    },\n    {\n      "hotelName": "Excalibur Hotel & Casino",\n      "hotelAddress": "3850 S Las Vegas Blvd, Las Vegas, NV 89109",\n      "price": 50,\n      "hotelImageURL": "https://example.com/excalibur.jpg",\n      "geoCoordinates": {\n        "latitude": 36.0984,\n        "longitude": -115.1744\n      },\n      "rating": 4.0,\n      "description": "Medieval-themed hotel with affordable rooms, a variety of restaurants, and live entertainment."\n    },\n     {\n      "hotelName": "Luxor Hotel & Casino",\n      "hotelAddress": "3900 S Las Vegas Blvd, Las Vegas, NV 89119",\n      "price": 55,\n      "hotelImageURL": "https://example.com/luxor.jpg",\n      "geoCoordinates": {\n        "latitude": 36.0956,\n        "longitude": -115.1761\n      },\n      "rating": 4.2,\n      "description": "Pyramid-shaped hotel with unique attractions, dining options, and relatively affordable prices."\n    }\n  ],\n  "itinerary": {\n    "day1": [\n      {\n        "placeName": "Welcome to Las Vegas Sign",\n        "placeDetails": "Iconic sign at the south end of the Strip. A must-see photo op.",\n        "placeImageURL": "https://example.com/welcome_sign.jpg",\n        "geoCoordinates": {\n          "latitude": 36.0828,\n          "longitude": -115.1733\n        },\n        "ticketPricing": "Free",\n        "bestTimeToVisit": "Early morning to avoid crowds and heat.",\n        "travelTimeToFromPrevious": "From hotel (Circus Circus): 20 mins by car"\n      },\n      {\n        "placeName": "Fremont Street Experience",\n        "placeDetails": "Light and sound show in downtown Las Vegas. Free to walk around and enjoy the atmosphere.",\n        "placeImageURL": "https://example.com/fremont_street.jpg",\n        "geoCoordinates": {\n          "latitude": 36.1703,\n          "longitude": -115.1422\n        },\n        "ticketPricing": "Free",\n        "bestTimeToVisit": "Evening for the light show.",\n        "travelTimeToFromPrevious": "From Welcome Sign: 30 mins by car"\n      },\n      {\n        "placeName": "Golden Nugget",\n        "placeDetails": "Historic casino on Fremont Street, known for its gold nugget display.",\n        "placeImageURL": "https://example.com/golden_nugget.jpg",\n        "geoCoordinates": {\n          "latitude": 36.1706,\n          "longitude": -115.1436\n        },\n        "ticketPricing": "Free to enter (gambling costs apply)",\n        "bestTimeToVisit": "Any time of day or night.",\n        "travelTimeToFromPrevious": "Walking distance from Fremont Street Experience"\n      }\n    ],\n    "day2": [\n      {\n        "placeName": "Bellagio Conservatory & Botanical Garden",\n        "placeDetails": "Stunning floral displays that change seasonally.",\n        "placeImageURL": "https://example.com/bellagio_garden.jpg",\n        "geoCoordinates": {\n          "latitude": 36.1127,\n          "longitude": -115.1742\n        },\n        "ticketPricing": "Free",\n        "bestTimeToVisit": "Mid-morning to avoid peak crowds.",\n        "travelTimeToFromPrevious": "From hotel (Circus Circus): 10 mins by car"\n      },\n      {\n        "placeName": "Bellagio Fountains",\n        "placeDetails": "Spectacular water show choreographed to music.",\n        "placeImageURL": "https://example.com/bellagio_fountains.jpg",\n        "geoCoordinates": {\n          "latitude": 36.1126,\n          "longitude": -115.1739\n        },\n        "ticketPricing": "Free",\n        "bestTimeToVisit": "Evening for optimal viewing.",\n        "travelTimeToFromPrevious": "Adjacent to the Bellagio Conservatory"\n      },\n      {\n        "placeName": "High Roller Observation Wheel",\n        "placeDetails": "Enjoy the view of Las Vegas from above in a capsule.",\n        "placeImageURL": "https://example.com/high_roller.jpg",\n        "geoCoordinates": {\n          "latitude": 36.1154,\n          "longitude": -115.1600\n        },\n        "ticketPricing": "From $25 per person",\n        "bestTimeToVisit": "Sunset for the best views.",\n        "travelTimeToFromPrevious": "10 mins by car from Bellagio Fountains"\n      }\n    ],\n    "day3": [\n      {\n        "placeName": "Red Rock Canyon National Conservation Area",\n        "placeDetails": "Scenic desert landscape with hiking trails and stunning rock formations.",\n        "placeImageURL": "https://example.com/red_rock_canyon.jpg",\n        "geoCoordinates": {\n          "latitude": 36.1349,\n          "longitude": -115.4151\n        },\n        "ticketPricing": "$15 per vehicle",\n        "bestTimeToVisit": "Early morning or late afternoon to avoid heat.",\n        "travelTimeToFromPrevious": "From hotel (Circus Circus): 30 mins by car"\n      },\n      {\n        "placeName": "Seven Magic Mountains",\n        "placeDetails": "Public art installation featuring colorful stacked boulders.",\n        "placeImageURL": "https://example.com/seven_magic_mountains.jpg",\n        "geoCoordinates": {\n          "latitude": 35.9461,\n          "longitude": -115.1639\n        },\n        "ticketPricing": "Free",\n        "bestTimeToVisit": "Any time of day, but best lighting in the afternoon.",\n        "travelTimeToFromPrevious": "From Red Rock Canyon: 45 mins by car"\n      },\n      {\n        "placeName": "Optional - In-N-Out Burger",\n        "placeDetails": "A must-try if you\'re not familiar, local fast-food.",\n        "placeImageURL": "https://example.com/innout.jpg",\n        "geoCoordinates": {\n          "latitude": 36.0978,\n          "longitude": -115.1531\n        },\n        "ticketPricing": "Around $10",\n        "bestTimeToVisit": "Anytime",\n        "travelTimeToFromPrevious": "From Seven Magic Mountains: 20 mins by car (to the location near the Strip)"\n      }\n    ]\n  }\n}\n```',
        },
      ],
    },
  ],
});

//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());
// }

// run();
