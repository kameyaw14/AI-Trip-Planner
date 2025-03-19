// src/models/Trip.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const tripSchema = new Schema({
  destination: { type: String, required: true },
  days: { type: Number, required: true },
  budget: { type: String, required: true },
  travellers: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Prevent model overwrite in development (hot-reloading)
export default mongoose.models.Trip || mongoose.model('Trip', tripSchema);
