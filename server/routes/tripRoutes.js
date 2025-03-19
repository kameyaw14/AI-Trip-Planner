// src/routes/tripRoutes.js
import express from 'express';
import { createGeneratedTrip, getGeneratedTripById, getGeneratedTrips } from '../controllers/generatedTripController.js';

const tripRouter = express.Router();

// POST /api/trips
tripRouter.post('/', createGeneratedTrip);
tripRouter.get('/', getGeneratedTrips);
tripRouter.get('/:id', getGeneratedTripById);

export default tripRouter;
