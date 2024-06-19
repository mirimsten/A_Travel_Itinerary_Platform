import { pool } from './db.js';

//--------------passwords-----------------

// Retrieve the latest password for a user by user ID
export async function getPasswordByUserId(id) {
    try {
        const [rows] = await pool.query("SELECT * FROM passwords WHERE idOfUser = ? ORDER BY created DESC LIMIT 1", [id]);
        return rows;
    } catch (error) {
        throw new Error(`Error retrieving password for user with ID ${id}: ${error.message}`);
    }
}

// Create a new password for a user
export async function createPassword(idOfUser, password) {
    try {
        const [result] = await pool.query("INSERT INTO passwords (idOfUser, password) VALUES (?, ?)", [idOfUser, password]);
        const id = result.insertId;
        return getPasswordByUserId(idOfUser);
    } catch (error) {
        throw new Error(`Error creating password: ${error.message}`);
    }
}