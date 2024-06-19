import { pool } from './db.js';

//--------------users-----------------

// Get all users
export async function getAllUsers() {
    try {
            const [rows] = await pool.query("SELECT * FROM users");
            return rows;
        }
    catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
    }
}

// Get a user by ID
export async function getUserById(id) {
    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
        return rows;
    } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
}

// Create a new user
export async function createUser({ username, email, address, phone, permission }) {
    try {
        const [result] = await pool.query(`
            INSERT INTO users (username, email, address, phone, permission)
            VALUES (?, ?, ?, ?, ?)
        `, [username, email, address, phone, permission]);
        const id = result.insertId;
        return await getUserById(id);
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
}

// Update a user
export async function updateUserById(id, { username, email, address, phone, permission }) {
    try {
        const [result] = await pool.query(`
            UPDATE users 
            SET
            username = ?,
            email = ?,
            address = ?,
            phone = ?,
            permission = ?
            WHERE id = ?
        `, [username, email, address, phone, permission, id]);

        if (result.affectedRows === 1) {
            return await getUserById(id);
        } else {
            throw new Error(`User with id ${id} not found`);
        }
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
}

// Delete a user
export async function deleteUserById(id) {
    try {
        const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
        if (result.affectedRows === 1) {
            return true;
        } else {
            throw new Error(`User with id ${id} not found`);
        }
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
}

// const users = await getAllUsers();
// console.log(users);