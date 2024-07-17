import { SavedSearchTrip } from './db.js';

// Get all save trips
export async function getAllSavedSearchTrip() {
    try {
        const reservedTrips = await SavedSearchTrip.find();
        return reservedTrips;
    } catch (error) {
        throw new Error(`Error fetching reserved trips: ${error.message}`);
    }
}

// Get a reserved trip by ID
export async function getSavedSearchTripById(id) {
    try {
        const reservedTrip = await SavedSearchTrip.findOne({ searchTripId: id });
        return reservedTrip;
    } catch (error) {
        throw new Error(`Error fetching reserved trip: ${error.message}`);
    }
}

// Create a new reserved trip
export async function createSavedSearchTrip({ userId, country, startDate, endDate }) {
    try {
        const newReservedTrip = new SavedSearchTrip({
            userId,
            country,
            startDate,
            endDate
        });
        await newReservedTrip.save();
        return await getSavedSearchTripById(newReservedTrip.searchTripId);
    } catch (error) {
        throw new Error(`Error creating reserved trip: ${error.message}`);
    }
}

//הפונקצייה הזאת אינה שימושית לצד לקוח, האם צד השרת אמור להיות מותאם לכך או שטוב שיהיה את כל האפשרויות ?
// Update a reserved trip
export async function updateSavedSearchTripById(id, country, startDate, endDate ) {
    try {
        const updateReservedTrip = await SavedSearchTrip.findOneAndUpdate(
            { searchTripId: id },
            { country, startDate, endDate },
            { new: true }
        );

        if (updateReservedTrip) {
            return updateReservedTrip;
        } else {
            throw new Error(`reserved trip with id ${id} not found`);
        }
    } catch (error) {
        throw new Error(`Error updating reserved trip: ${error.message}`);
    }
}

// Delete a reserved trip
export async function deleteSavedSearchTripById(id) {
    try {
        const result = await SavedSearchTrip.deleteOne({ searchTripId: id });
        if (result.deletedCount === 1) {
            return true;
        } else {
            throw new Error(`reserved trip with id ${id} not found`);
        }
    } catch (error) {
        throw new Error(`Error deleting reserved trip: ${error.message}`);
    }
}