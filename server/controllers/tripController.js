// src/controllers/tripController.js

import Trip from "../models/Trip.js";

export const createTrip = async (req, res) => {
  try {
    const { destination, days, budget, travellers } = req.body;
    const newTrip = new Trip({ destination, days, budget, travellers });
    const savedTrip = await newTrip.save();
    return res.status(201).json(savedTrip);
  } catch (error) {
    console.error('Error saving trip:', error);
    return res.status(500).json({ error: error.message });
  }
};
