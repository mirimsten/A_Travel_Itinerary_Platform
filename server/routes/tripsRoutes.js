import express from 'express';
import {
    getTrips_ as getTrips,
    getTripById_ as getTripById,
    createTrip_ as createTrip,
    updateTrip_ as updateTrip,
    deleteTrip_ as deleteTrip
} from '../controllers/tripController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to retrieve all trips
router.get('/', authenticateToken, getTrips);

// Route to retrieve a trip by ID
router.get('/:id', getTripById);

// Route to create a new trip
router.post('/', createTrip);

// Route to update a trip
router.put('/:id', updateTrip);

// Route to delete a trip
router.delete('/:id', deleteTrip);

export default router;
