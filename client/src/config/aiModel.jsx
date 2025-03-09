import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
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

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Generate a detailed travel plan in JSON format for the following scenario:

- Location: Las Vegas
- Duration: 3 Days
- Travelers: A couple
- Budget: Cheap

Requirements:
1. Provide a list of recommended hotels, each with:
   - Hotel Name
   - Hotel Address
   - Price (per night)
   - Hotel Image URL(use real images)
   - Geo Coordinates
   - Rating
   - Description

2. Suggest a daily itinerary covering 3 days, each day including:
   - Place Name
   - Place Details
   - Place Image URL(use real images)
   - Geo Coordinates
   - Ticket Pricing
   - Best Time to Visit
   - Travel Time to/from each location

Output everything in valid JSON format, with clear structure for the hotels list and the daily itinerary plan.`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `\`\`\`json
{
  "tripDetails": {
    "location": "Las Vegas",
    "duration": "3 Days",
    "travelers": "Couple",
    "budget": "Cheap"
  },
  "hotels": [
    {
      "hotelName": "Circus Circus Hotel & Casino",
      "hotelAddress": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",
      "price": 45,
      "hotelImageURL": "https://source.unsplash.com/featured/?circus-circus,lasvegas",
      "geoCoordinates": {
        "latitude": 36.1265,
        "longitude": -115.1634
      },
      "rating": 3.5,
      "description": "Affordable option with a circus theme, indoor amusement park, and multiple dining choices."
    },
    {
      "hotelName": "Excalibur Hotel & Casino",
      "hotelAddress": "3850 S Las Vegas Blvd, Las Vegas, NV 89109",
      "price": 50,
      "hotelImageURL": "https://source.unsplash.com/featured/?excalibur,hotel,lasvegas",
      "geoCoordinates": {
        "latitude": 36.0984,
        "longitude": -115.1744
      },
      "rating": 4.0,
      "description": "Medieval-themed hotel with affordable rooms, a variety of restaurants, and live entertainment."
    },
    {
      "hotelName": "Luxor Hotel & Casino",
      "hotelAddress": "3900 S Las Vegas Blvd, Las Vegas, NV 89119",
      "price": 55,
      "hotelImageURL": "https://source.unsplash.com/featured/?luxor,hotel,lasvegas",
      "geoCoordinates": {
        "latitude": 36.0956,
        "longitude": -115.1761
      },
      "rating": 4.2,
      "description": "Pyramid-shaped hotel with unique attractions, dining options, and relatively affordable prices."
    }
  ],
  "itinerary": {
    "day1": [
      {
        "placeName": "Welcome to Las Vegas Sign",
        "placeDetails": "Iconic sign at the south end of the Strip. A must-see photo op.",
        "placeImageURL": "https://source.unsplash.com/featured/?lasvegas,sign",
        "geoCoordinates": {
          "latitude": 36.0828,
          "longitude": -115.1733
        },
        "ticketPricing": "Free",
        "bestTimeToVisit": "Early morning to avoid crowds and heat.",
        "travelTimeToFromPrevious": "From hotel (Circus Circus): 20 mins by car"
      },
      {
        "placeName": "Fremont Street Experience",
        "placeDetails": "Light and sound show in downtown Las Vegas. Free to walk around and enjoy the atmosphere.",
        "placeImageURL": "https://source.unsplash.com/featured/?fremont,street,lasvegas",
        "geoCoordinates": {
          "latitude": 36.1703,
          "longitude": -115.1422
        },
        "ticketPricing": "Free",
        "bestTimeToVisit": "Evening for the light show.",
        "travelTimeToFromPrevious": "From Welcome Sign: 30 mins by car"
      },
      {
        "placeName": "Golden Nugget",
        "placeDetails": "Historic casino on Fremont Street, known for its gold nugget display.",
        "placeImageURL": "https://source.unsplash.com/featured/?golden,nugget,lasvegas",
        "geoCoordinates": {
          "latitude": 36.1706,
          "longitude": -115.1436
        },
        "ticketPricing": "Free to enter (gambling costs apply)",
        "bestTimeToVisit": "Any time of day or night.",
        "travelTimeToFromPrevious": "Walking distance from Fremont Street Experience"
      }
    ],
    "day2": [
      {
        "placeName": "Bellagio Conservatory & Botanical Garden",
        "placeDetails": "Stunning floral displays that change seasonally.",
        "placeImageURL": "https://source.unsplash.com/featured/?bellagio,garden",
        "geoCoordinates": {
          "latitude": 36.1127,
          "longitude": -115.1742
        },
        "ticketPricing": "Free",
        "bestTimeToVisit": "Mid-morning to avoid peak crowds.",
        "travelTimeToFromPrevious": "From hotel (Circus Circus): 10 mins by car"
      },
      {
        "placeName": "Bellagio Fountains",
        "placeDetails": "Spectacular water show choreographed to music.",
        "placeImageURL": "https://source.unsplash.com/featured/?bellagio,fountains",
        "geoCoordinates": {
          "latitude": 36.1126,
          "longitude": -115.1739
        },
        "ticketPricing": "Free",
        "bestTimeToVisit": "Evening for optimal viewing.",
        "travelTimeToFromPrevious": "Adjacent to the Bellagio Conservatory"
      },
      {
        "placeName": "High Roller Observation Wheel",
        "placeDetails": "Enjoy the view of Las Vegas from above in a capsule.",
        "placeImageURL": "https://source.unsplash.com/featured/?high,roller",
        "geoCoordinates": {
          "latitude": 36.1154,
          "longitude": -115.1600
        },
        "ticketPricing": "From $25 per person",
        "bestTimeToVisit": "Sunset for the best views.",
        "travelTimeToFromPrevious": "10 mins by car from Bellagio Fountains"
      }
    ],
    "day3": [
      {
        "placeName": "Red Rock Canyon National Conservation Area",
        "placeDetails": "Scenic desert landscape with hiking trails and stunning rock formations.",
        "placeImageURL": "https://source.unsplash.com/featured/?red,rock,canyon",
        "geoCoordinates": {
          "latitude": 36.1349,
          "longitude": -115.4151
        },
        "ticketPricing": "$15 per vehicle",
        "bestTimeToVisit": "Early morning or late afternoon to avoid heat.",
        "travelTimeToFromPrevious": "From hotel (Circus Circus): 30 mins by car"
      },
      {
        "placeName": "Seven Magic Mountains",
        "placeDetails": "Public art installation featuring colorful stacked boulders.",
        "placeImageURL": "https://source.unsplash.com/featured/?seven,magic,mountains",
        "geoCoordinates": {
          "latitude": 35.9461,
          "longitude": -115.1639
        },
        "ticketPricing": "Free",
        "bestTimeToVisit": "Any time of day, but best lighting in the afternoon.",
        "travelTimeToFromPrevious": "From Red Rock Canyon: 45 mins by car"
      },
      {
        "placeName": "Optional - In-N-Out Burger",
        "placeDetails": "A must-try if you're not familiar, local fast-food.",
        "placeImageURL": "https://source.unsplash.com/featured/?innout,burger",
        "geoCoordinates": {
          "latitude": 36.0978,
          "longitude": -115.1531
        },
        "ticketPricing": "Around $10",
        "bestTimeToVisit": "Anytime",
        "travelTimeToFromPrevious": "From Seven Magic Mountains: 20 mins by car (near the Strip)"
      }
    ]
  }
}
\`\`\``,
        },
      ],
    },
  ],
});
