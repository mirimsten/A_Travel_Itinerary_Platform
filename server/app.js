
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/usersRoutes.js';
import tripsRoutes from './routes/tripsRoutes.js';
import passwordsRoutes from './routes/passwordsRoutes.js';
import commentsRoutes from './routes/commentsRoutes.js';
import savedSearchTripsRoutes from './routes/savedSearchTripRoutes.js';
import uploadsRoutes from './routes/uploadsRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

dotenv.config({ path: './.env' });
const PORT = process.env.PORT || 3000;


// Middleware
// app.use(cors()); // Enable CORS for all origins
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/users', userRoutes);
app.use('/trips', tripsRoutes);
app.use('/passwords', passwordsRoutes);
app.use('/comments', commentsRoutes);
app.use('/savedSearchTrips', savedSearchTripsRoutes);
app.use('/uploads', uploadsRoutes);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our application." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});