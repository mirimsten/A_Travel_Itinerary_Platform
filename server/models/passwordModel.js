// import { pool } from './db.js';

// //--------------passwords-----------------

// // Retrieve the latest password for a user by user ID
// export async function getPasswordByUserId(id) {
//     try {
//         const [rows] = await pool.query("SELECT * FROM passwords WHERE idOfUser = ? ORDER BY created DESC LIMIT 1", [id]);
//         return rows;
//     } catch (error) {
//         throw new Error(`Error retrieving password for user with ID ${id}: ${error.message}`);
//     }
// }

// // Create a new password for a user
// export async function createPassword(idOfUser, password) {
//     try {
//         const [result] = await pool.query("INSERT INTO passwords (idOfUser, password) VALUES (?, ?)", [idOfUser, password]);
//         const id = result.insertId;
//         return getPasswordByUserId(idOfUser);
//     } catch (error) {
//         throw new Error(`Error creating password: ${error.message}`);
//     }
// }













// import { Password } from './db.js';

// // Retrieve the latest password for a user by user ID
// export async function getPasswordByUserId(idOfUser) {
//     try {
//         const password = await Password.findOne({ idOfUser: idOfUser }).sort({ created: -1 }).exec();
//         return password;
//     } catch (error) {
//         throw new Error(`Error retrieving password for user with ID ${idOfUser}: ${error.message}`);
//     }
// }

// // Create a new password for a user
// export async function createPassword(idOfUser, password) {
//     try {
//         const newPassword = new Password({
//             idOfUser: idOfUser,
//             password: password
//         });
//         await newPassword.save();
//         return getPasswordByUserId(idOfUser);
//     } catch (error) {
//         throw new Error(`Error creating password: ${error.message}`);
//     }
// }






import { Password } from './db.js';

// Retrieve the latest password for a user by user ID
export async function getPasswordByUserId(userId) {
    try {
        const password = await Password.findOne({ userId: userId }).sort({ createdAt: -1 }).exec();
        return password? [password]: [];
    } catch (error) {
        throw new Error(`Error retrieving password for user with ID ${userId}: ${error.message}`);
    }
}

// Create a new password for a user
export async function createPassword(userId, password) {
    try {
        const newPassword = new Password({
            userId: userId,
            password: password
        });
        await newPassword.save();
        return getPasswordByUserId(userId);
    } catch (error) {
        throw new Error(`Error creating password: ${error.message}`);
    }
}
