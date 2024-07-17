import express from 'express';
import {
    getAllSavedSearchTrip_ as getAllSavedSearchTrip,
    getSavedSearchTripById_ as getSavedSearchTripById,
    createSavedSearchTrip_ as createSavedSearchTrip,
    updateSavedSearchTripById_ as updateSavedSearchTripById,
    deleteSavedSearchTripById_ as deleteSavedSearchTripById
} from '../controllers/savedSearchTripController.js';

const router = express.Router();

// Route to retrieve all reserved trips
router.get('/', getAllSavedSearchTrip);

// Route to retrieve a reserved trip by ID
router.get('/:id', getSavedSearchTripById);

// Route to create a new reserved trip
router.post('/', createSavedSearchTrip);

// Route to update a reserved trip
router.put('/:id', updateSavedSearchTripById);

// Route to delete a reserved trip
router.delete('/:id', deleteSavedSearchTripById);

export default router;
