import { getAllSavedSearchTrip, getSavedSearchTripById, createSavedSearchTrip, updateSavedSearchTripById, deleteSavedSearchTripById } from '../models/savedSearchTripModel.js';

// Controller function to retrieve all reserved trips
export const getAllSavedSearchTrip_ = async (req, res) => {
    const { reservedTripId } = req.query;
    try {
        const reservedTrips = await getAllSavedSearchTrip(reservedTripId);
        res.status(200).json(reservedTrips);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to retrieve a reserved trip by ID
export const getSavedSearchTripById_ = async (req, res) => {
    const { id } = req.params;
    try {
        const reservedTrip = await getSavedSearchTripById(id);
        if (reservedTrip) {
            res.status(200).json(reservedTrip);
        } else {
            res.status(404).json({ message: `reserved trip with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to create a new reserved trip
export const createSavedSearchTrip_ = async (req, res) => {
    const { userId, country, startDate, endDate } = req.body;
    try {
        const newReservedTrip = await createSavedSearchTrip(userId, country, startDate, endDate);
        res.status(201).json(newReservedTrip);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to update a reserved trip
export const updateSavedSearchTripById_ = async (req, res) => {
    const { id } = req.params;
    const { country, startDate, endDate } = req.body;
    try {
        const updatedReservedTrip = await updateSavedSearchTripById(id, country, startDate, endDate);
        res.status(200).json(updatedReservedTrip);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to delete a reserved trip
export const deleteSavedSearchTripById_ = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deleteSavedSearchTripById(id);
        if (result) {
            res.status(200).json({ message: `reserved trip with ID ${id} deleted successfully` });
        } else {
            res.status(404).json({ message: `reserved trip with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
