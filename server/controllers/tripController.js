import { getAllTrips, getTripById, createTrip, updateTrip, deleteTripById } from '../models/commentModel.js';

//controller function to get all trips
export const getTrips_ = async (req, res) => {
    const tripData = req.body;
    try {
        const trips = await getAllTrips(tripData);
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to get a trip by ID
export const getTrip_ = async (req, res) => {
    const { id } = req.params;
    try {
        const trip = await getTripById(id);
        if (trip) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: `User with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

