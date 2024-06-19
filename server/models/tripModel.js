import { pool } from './db.js';

//-------------trip--------------

//Get all trips.
export async function getAllTrips({ type = "", value = "" }) {
    try {
        let query = "SELECT * FROM trips";
        let params = [];

        switch (type) {
            case "":
                break;
            case "id":
                query += " WHERE id = ?";
                params = [value];
                break;
            case "country":
                query += " WHERE country = ?";
                params = [value];
                break;
            default:
                throw new Error(`Invalid type: ${type}`);
        }

        const [rows] = await pool.query(query, params);
        return rows;
    } catch (error) {
        throw new Error(`Error fetching trips: ${error.message}`);
    }
}

// Get a trip by ID
export async function getTripById(id) {
    try {
        const [rows] = await pool.query("SELECT * FROM trips WHERE id = ?", [id]);
        return rows;
    } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
}

// Create a new trip
export async function createTrip({ username, country, title, description, dwellTime, photoA = "", photoB = "", photoC = "", video = "" }) {
    try {
        const [result] = await pool.query(`
            INSERT INTO trips (username, country, title, description, dwellTime, photoA, photoB, photoC, video)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [username, country, title, description, dwellTime, photoA, photoB, photoC, video]);
        const id = result.insertId;
        return await getTripById(id);
    } catch (error) {
        throw new Error(`Error creating trip: ${error.message}`);
    }
}

//Update a trip
export async function updateTrip(id, { username, country, title, description, dwellTime, photoA = "", photoB = "", photoC = "", video = "" }) {
    try {
        const [result] = await pool.query(`
            UPDATE trips 
            SET
            username = ?,
            country = ?,
            title = ?,
            description = ?,
            dwellTime = ?,
            photoA = ?,
            photoB = ?,
            photoC = ?,
            video = ?
            WHERE id = ?
        `, [username, country, title, description, dwellTime, photoA, photoB, photoC, video, id]);

        if (result.affectedRows === 1) {
            return await getTripById(id);
        } else {
            throw new Error(`Trip with id ${id} not found`);
        }
    } catch (error) {
        throw new Error(`Error updating trip: ${error.message}`);
    }
}

// Delete a user
export async function deleteTripById(id) {
    try {
        const [result] = await pool.query("DELETE FROM trips WHERE id = ?", [id]);
        if (result.affectedRows === 1) {
            return true;
        } else {
            throw new Error(`Trip with id ${id} not found`);
        }
    } catch (error) {
        throw new Error(`Error deleting trip: ${error.message}`);
    }
}
