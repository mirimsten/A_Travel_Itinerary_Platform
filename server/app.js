

// // const app = express();

// // dotenv.config({ path: './.env' });
// // const PORT = process.env.PORT || 3000;

// // // Middleware
// // app.use(cors()); // Enable CORS for all origins
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // // Routes
// // app.use('/users', userRoutes);
// // app.use('/trips', tripsRoutes);
// // app.use('/passwords', passwordsRoutes);
// // app.use('/comments', commentsRoutes);
// // app.use('/savedSearchTrips', savedSearchTripsRoutes);

// // // Default route
// // app.get("/", (req, res) => {
// //   res.json({ message: "Welcome to our application." });
// // });

// // // Start the server
// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}.`);
// // });







// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import userRoutes from './routes/usersRoutes.js';
// import tripsRoutes from './routes/tripsRoutes.js';
// import passwordsRoutes from './routes/passwordsRoutes.js';
// import commentsRoutes from './routes/commentsRoutes.js';
// import savedSearchTripsRoutes from './routes/savedSearchTripRoutes.js';

// const app = express();

// dotenv.config({ path: './.env' });
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors()); // Enable CORS for all origins
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/users', userRoutes);
// app.use('/trips', tripsRoutes);
// app.use('/passwords', passwordsRoutes);
// app.use('/comments', commentsRoutes);
// app.use('/savedSearchTrips', savedSearchTripsRoutes);

// // Default route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to our application." });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });








import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './models/db.js';
import userRoutes from './routes/usersRoutes.js';
import tripsRoutes from './routes/tripsRoutes.js';
import passwordsRoutes from './routes/passwordsRoutes.js';
import commentsRoutes from './routes/commentsRoutes.js';
import savedSearchTripsRoutes from './routes/savedSearchTripRoutes.js';

dotenv.config({ path: './.env' });
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB().then(() => {
  // Routes
  app.use('/users', userRoutes);
  app.use('/trips', tripsRoutes);
  app.use('/passwords', passwordsRoutes);
  app.use('/comments', commentsRoutes);
  app.use('/savedSearchTrips', savedSearchTripsRoutes);

  // Default route
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to our application." });
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}).catch((err) => {
  console.error('Failed to connect to the database', err);
});
