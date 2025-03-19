// src/models/GeneratedTrip.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the schema for hotels (each hotel is an object in the hotels array)
const hotelSchema = new Schema({
  hotelName: { type: String, required: true },
  hotelAddress: { type: String, required: true },
  price: { type: Number, required: true },
  hotelImageURL: { type: String, required: true },
  geoCoordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
});

// Define the schema for itinerary items
const itineraryItemSchema = new Schema({
  placeName: { type: String, required: true },
  placeDetails: { type: String, required: true },
  placeImageURL: { type: String, required: true },
  geoCoordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  ticketPricing: { type: String, required: true },
  bestTimeToVisit: { type: String, required: true },
  travelTimeToFromPrevious: { type: String, required: true },
});

// Define the main generated trip schema
const generatedTripSchema = new Schema({
  tripDetails: {
    location: { type: String, required: true },
    duration: { type: String, required: true },
    travelers: { type: String, required: true },
    budget: { type: String, required: true },
  },
  hotels: [hotelSchema],
  itinerary: {
    // For each day, you can store an array of itinerary items
    day1: [itineraryItemSchema],
    day2: [itineraryItemSchema],
    // Extend with day3, day4 etc. if needed
  },
  createdAt: { type: Date, default: Date.now },
});

// Prevent model overwrite in development (hot-reloading)
export default mongoose.models.GeneratedTrip || mongoose.model('GeneratedTrip', generatedTripSchema);
