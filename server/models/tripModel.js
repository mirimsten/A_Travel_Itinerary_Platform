// import { pool } from './db.js';

// //-------------trip--------------

// //Get all trips.
// export async function getAllTrips({ type = "", value = "" }) {
//     try {
//         let query = "SELECT * FROM trips";
//         let params = [];

//         switch (type) {
//             case "":
//                 break;
//             case "id":
//                 query += " WHERE id = ?";
//                 params = [value];
//                 break;
//             case "country":
//                 query += " WHERE country = ?";
//                 params = [value];
//                 break;
//             default:
//                 throw new Error(`Invalid type: ${type}`);
//         }

//         const [rows] = await pool.query(query, params);
//         return rows;
//     } catch (error) {
//         throw new Error(`Error fetching trips: ${error.message}`);
//     }
// }

// // Get a trip by ID
// export async function getTripById(id) {
//     try {
//         const [rows] = await pool.query("SELECT * FROM trips WHERE id = ?", [id]);
//         return rows;
//     } catch (error) {
//         throw new Error(`Error fetching user: ${error.message}`);
//     }
// }

// // Create a new trip
// export async function createTrip({ username, country, title, description, dwellTime, photoA = "", photoB = "", photoC = "", video = "" }) {
//     try {
//         const [result] = await pool.query(`
//             INSERT INTO trips (username, country, title, description, dwellTime, photoA, photoB, photoC, video)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//         `, [username, country, title, description, dwellTime, photoA, photoB, photoC, video]);
//         const id = result.insertId;
//         return await getTripById(id);
//     } catch (error) {
//         throw new Error(`Error creating trip: ${error.message}`);
//     }
// }

// //Update a trip
// export async function updateTrip(id, { username, country, title, description, dwellTime, photoA = "", photoB = "", photoC = "", video = "" }) {
//     try {
//         const [result] = await pool.query(`
//             UPDATE trips 
//             SET
//             username = ?,
//             country = ?,
//             title = ?,
//             description = ?,
//             dwellTime = ?,
//             photoA = ?,
//             photoB = ?,
//             photoC = ?,
//             video = ?
//             WHERE id = ?
//         `, [username, country, title, description, dwellTime, photoA, photoB, photoC, video, id]);

//         if (result.affectedRows === 1) {
//             return await getTripById(id);
//         } else {
//             throw new Error(`Trip with id ${id} not found`);
//         }
//     } catch (error) {
//         throw new Error(`Error updating trip: ${error.message}`);
//     }
// }

// // Delete a trip
// export async function deleteTripById(id) {
//     try {
//         const [result] = await pool.query("DELETE FROM trips WHERE id = ?", [id]);
//         if (result.affectedRows === 1) {
//             return true;
//         } else {
//             throw new Error(`Trip with id ${id} not found`);
//         }
//     } catch (error) {
//         throw new Error(`Error deleting trip: ${error.message}`);
//     }
// }
























// import { Trip } from './db.js';

// // Get all trips
// export async function getAllTrips({ type = "", value = "" }) {
//     try {
//         let query = {};

//         switch (type) {
//             case "":
//                 break;
//             case "id":
//                 query.tripId = value;
//                 break;
//             case "country":
//                 query.country = value;
//                 break;
//             default:
//                 throw new Error(`Invalid type: ${type}`);
//         }

//         const trips = await Trip.find(query);
//         return trips;
//     } catch (error) {
//         throw new Error(`Error fetching trips: ${error.message}`);
//     }
// }

// // Get a trip by ID
// export async function getTripById(id) {
//     try {
//         const trip = await Trip.findOne({ tripId: id });
//         return trip;
//     } catch (error) {
//         throw new Error(`Error fetching trip: ${error.message}`);
//     }
// }

// // Create a new trip
// export async function createTrip({ username, country, title, description, dwellTime, photoA = "", photoB = "", photoC = "", video = "" }) {
//     try {
//         const newTrip = new Trip({
//             username,
//             country,
//             title,
//             description,
//             dwellTime,
//             photoA,
//             photoB,
//             photoC,
//             video
//         });
//         await newTrip.save();
//         return await getTripById(newTrip.tripId);
//     } catch (error) {
//         throw new Error(`Error creating trip: ${error.message}`);
//     }
// }

// // Update a trip
// export async function updateTrip(id, { username, country, title, description, dwellTime, photoA = "", photoB = "", photoC = "", video = "" }) {
//     try {
//         const updatedTrip = await Trip.findOneAndUpdate(
//             { tripId: id },
//             { username, country, title, description, dwellTime, photoA, photoB, photoC, video },
//             { new: true }
//         );

//         if (updatedTrip) {
//             return updatedTrip;
//         } else {
//             throw new Error(`Trip with id ${id} not found`);
//         }
//     } catch (error) {
//         throw new Error(`Error updating trip: ${error.message}`);
//     }
// }

// // Delete a trip
// export async function deleteTripById(id) {
//     try {
//         const result = await Trip.deleteOne({ tripId: id });
//         if (result.deletedCount === 1) {
//             return true;
//         } else {
//             throw new Error(`Trip with id ${id} not found`);
//         }
//     } catch (error) {
//         throw new Error(`Error deleting trip: ${error.message}`);
//     }}






















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


// // Get all trips
// export async function getAllTrips({ type = "", value = "" }) {
//     try {
//         let query = {};

//         switch (type) {
//             case "":
//                 break;
//             case "id":
//                 query._id = value;  // שימוש ב-Mongoose ID
//                 break;
//             case "country":
//                 query.country = value;
//                 break;
//             case "userId":
//                 query.userId = value;
//                 break;
//             default:
//                 throw new Error(`Invalid type: ${type}`);
//         }

//         const trips = await Trip.find(query);
//         return trips;
//     } catch (error) {
//         throw new Error(`Error fetching trips: ${error.message}`);
//     }
// }

// // Get all trips
// export async function getAllTrips({ type = "", value = "" }) {
//     try {
//         let query = {};

//         switch (type) {
//             case "":
//                 break;
//             case "id":
//                 query._id = value;
//                 break;
//             case "country":
//                 query.country = value;
//                 break;
//             case "userId":
//                 query.userId = value;
//                 break;
//             default:
//                 throw new Error(`Invalid type: ${type}`);
//         }

//         const trips = await Trip.find(query);
//         return trips;
//     } catch (error) {
//         throw new Error(`Error fetching trips: ${error.message}`);
//     }
// }

// Get a trip by ID
export async function getTripById(id) {
    try {
        const trip = await Trip.findById(id); // שימוש ב-Mongoose ID
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
            videos
        });
        await newTrip.save();
        return await getTripById(newTrip._id); // שימוש ב-Mongoose ID
    } catch (error) {
        throw new Error(`Error creating trip: ${error.message}`);
    }
}

// Update a trip
export async function updateTrip(id, { country, title, description, duration, photos = [], videos = [], likes }) {
    try {
        const updatedTrip = await Trip.findByIdAndUpdate(
            id, // שימוש ב-Mongoose ID
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
        const result = await Trip.findByIdAndDelete(id); // שימוש ב-Mongoose ID
        return result ? true : false;
    } catch (error) {
        throw new Error(`Error deleting trip: ${error.message}`);
    }
}