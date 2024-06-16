import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/usersRoutes.js';
import tripsRoutes from './routes/tripsRoutes.js';
import passwordsRoutes from './routes/passwordsRoutes.js';
import commentsRoutes from './routes/commentsRoutes.js';

const app = express();

dotenv.config({ path: './.env' });

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', userRouter);
app.use('/trips', tripsRoutes);
app.use('/passwords', passwordsRoutes);
app.use('/comments', commentsRoutes);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our application." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});