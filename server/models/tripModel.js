import { Trip } from './db.js';

// Get all trips
export async function getAllTrips({ country = "", userId = "", sortBy = "", limit, offset }) {
    try {
        let query = {};

        if (country) {
            query.country = country;
        }
        if (userId) {
            query.userId = userId;
        }

        let sortQuery = {};
        if (sortBy === "likes") {
            sortQuery.likes = -1; // Sort by likes in descending order
        }
        const trips = await Trip.find(query)
            .sort(sortQuery)
            .limit(limit)
            .skip(offset);
        return trips;
    } catch (error) {
        throw new Error(`Error fetching trips: ${error.message}`);
    }
}

// Get a trip by ID
export async function getTripById(id) {
    try {
        const trip = await Trip.findById(id); 
        return trip ? [trip] : [];
    } catch (error) {
        throw new Error(`Error fetching trip: ${error.message}`);
    }
}

// Create a new trip
export async function createTrip({ userId, country, title, description, duration, photos = [], videos = [] }) {
    try {
        const newTrip = new Trip({
            userId,
            country,
            title,
            description,
            duration,
            photos,
            videos,
            likes: 0
        });
        await newTrip.save();
        return await getTripById(newTrip._id);
    } catch (error) {
        throw new Error(`Error creating trip: ${error.message}`);
    }
}

// Update a trip
export async function updateTrip(id, { country, title, description, duration, photos = [], videos = [], likes }) {
    try {
        const updatedTrip = await Trip.findByIdAndUpdate(
            id,
            { country: country, title: title, description: description, duration: duration, photos: photos, videos: videos, likes: likes },
            { new: true }
        );

        return updatedTrip ? [updatedTrip] : [];
    } catch (error) {
        throw new Error(`Error updating trip: ${error.message}`);
    }
}

// Delete a trip
export async function deleteTripById(id) {
    try {
        const result = await Trip.findByIdAndDelete(id); 
        return result ? true : false;
    } catch (error) {
        throw new Error(`Error deleting trip: ${error.message}`);
    }
}