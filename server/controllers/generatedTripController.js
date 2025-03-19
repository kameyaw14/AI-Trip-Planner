// src/controllers/generatedTripController.js

import GeneratedTrip from "../models/GeneratedTrip.js";

export const createGeneratedTrip = async (req, res) => {
  try {
    // The entire generated trip JSON is expected in req.body
    const generatedTrip = new GeneratedTrip(req.body);
    const savedTrip = await generatedTrip.save();
    return res.status(201).json(savedTrip);
  } catch (error) {
    console.error('Error saving generated trip:', error);
    return res.status(500).json({ error: error.message });
  }
};

export const getGeneratedTrips = async (req, res) => {
  try {
    const trips = await GeneratedTrip.find().sort({ createdAt: -1 });
    return res.status(200).json(trips);
  } catch (error) {
    console.error('Error fetching generated trips:', error);
    return res.status(500).json({ error: error.message });
  }
};
export const getGeneratedTripById = async (req, res) => {
    try {
      const { id } = req.params;
      const trip = await GeneratedTrip.findById(id);
      if (!trip) {
        return res.status(404).json({ error: 'Trip not found' });
      }
      res.status(200).json(trip);
    } catch (error) {
      console.error('Error fetching trip:', error);
      res.status(500).json({ error: error.message });
    }
  };