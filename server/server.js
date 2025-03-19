// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import tripRouter from './routes/tripRoutes.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

app.use(cors());

// Middleware for parsing JSON bodies.
app.use(express.json());

// Connect to MongoDB Atlas.
await connectDB();

// Use the trip routes.
app.use('/api/generated-trips', tripRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
