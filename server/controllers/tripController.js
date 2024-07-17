import { getAllTrips, getTripById, createTrip, updateTrip, deleteTripById } from '../models/tripModel.js';

// //controller function to get all trips
// export const getTrips_ = async (req, res) => {
//     const tripData = req.body;
//     try {
//         const trips = await getAllTrips(tripData);
//         res.status(200).json(trips);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// controller function to get all trips
export const getTrips_ = async (req, res) => {
    const { type, value, sortBy } = req.query; // קבלת הפרמטרים מהשאילתה
    try {
        const trips = await getAllTrips({ type, value, sortBy });
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Controller function to get a trip by ID
export const getTripById_ = async (req, res) => {
    const { id } = req.params;
    try {
        const trip = await getTripById(id);
        if (trip.length) {
            res.status(200).json(user);
        } else {
            // res.status(404).json({ message: `User with ID ${id} not found` });
            res.status(404).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to create a new trip
export const createTrip_ = async (req, res) => {
    const tripData = req.body;
    try {
        const newTrip = await createTrip(tripData);
        res.status(201).json(newTrip);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to update a trip by ID
export const updateTrip_ = async (req, res) => {
    const { id } = req.params;
    const tripData = req.body;
    try {
        const updatedTrip = await updateTrip(id, tripData);
        res.status(200).json(updatedTrip);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to delete a trip by ID
export const deleteTrip_ = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deleteTripById(id);
        if (result) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: `Trip with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};