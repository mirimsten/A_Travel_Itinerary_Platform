// import { pool } from './db.js';

// //--------------users-----------------

// // Get all users
// export async function getAllUsers() {
//     try {
//             const [rows] = await pool.query("SELECT * FROM users");
//             return rows;
//         }
//     catch (error) {
//         throw new Error(`Error fetching users: ${error.message}`);
//     }
// }

// // Get a user by ID
// export async function getUserById(id) {
//     try {
//         const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
//         return rows;
//     } catch (error) {
//         throw new Error(`Error fetching user: ${error.message}`);
//     }
// }

// // Create a new user
// export async function createUser({ username, email, address, phone, permission }) {
//     try {
//         const [result] = await pool.query(`
//             INSERT INTO users (username, email, address, phone, permission)
//             VALUES (?, ?, ?, ?, ?)
//         `, [username, email, address, phone, permission]);
//         const id = result.insertId;
//         return await getUserById(id);
//     } catch (error) {
//         throw new Error(`Error creating user: ${error.message}`);
//     }
// }

// // Update a user
// export async function updateUserById(id, { username, email, address, phone, permission }) {
//     try {
//         const [result] = await pool.query(`
//             UPDATE users 
//             SET
//             username = ?,
//             email = ?,
//             address = ?,
//             phone = ?,
//             permission = ?
//             WHERE id = ?
//         `, [username, email, address, phone, permission, id]);

//         if (result.affectedRows === 1) {
//             return await getUserById(id);
//         } else {
//             throw new Error(`User with id ${id} not found`);
//         }
//     } catch (error) {
//         throw new Error(`Error updating user: ${error.message}`);
//     }
// }

// // Delete a user
// export async function deleteUserById(id) {
//     try {
//         const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
//         if (result.affectedRows === 1) {
//             return true;
//         } else {
//             throw new Error(`User with id ${id} not found`);
//         }
//     } catch (error) {
//         throw new Error(`Error deleting user: ${error.message}`);
//     }
// }

// // const users = await getAllUsers();
// // console.log(users);













import { User } from './db.js';

// Get all users
export async function getAllUsers() {
    try {
        console.log("kkkkkk")
        const users = await User.find();
        console.log("jjjjjj")
        return users;
    } catch (error) {
        console.log("ccccc")
        throw new Error(`Error fetching users: ${error.message}`);
    }
}

// Get a user by ID
export async function getUserById(id) {
    try {
        const user = await User.findOne({ userId: id });
        return user;
    } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
}

// Create a new user
export async function createUser({ username, email, address, phone, permission }) {
    try {
        const newUser = new User({
            username,
            email,
            address,
            phone,
            permission
        });
        await newUser.save();
        return await getUserById(newUser.userId);
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
}

// Update a user
export async function updateUserById(id, { username, email, address, phone, permission }) {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { userId: id },
            { username, email, address, phone, permission },
            { new: true }
        );

        if (updatedUser) {
            return updatedUser;
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
        const result = await User.deleteOne({ userId: id });
        if (result.deletedCount === 1) {
            return true;
        } else {
            throw new Error(`User with id ${id} not found`);
        }
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
}