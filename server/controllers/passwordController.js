import { getPasswordByUserId, createPassword } from '../models/passwordModel.js';

// Controller function to retrieve the latest password for a user by user ID
export const getPassword_ = async (req, res) => {
    const { id } = req.params;
    try {
        const password = await getPasswordByUserId(id);
        if (password.length) {
            res.status(200).json(password);
        } else {
            // res.status(404).json({ message: `Password for user with ID ${id} not found` });
            res.status(404).json(password);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to create a new password for a user
export const createPassword_ = async (req, res) => {
    const { userId, password } = req.body;
    try {
        const newPassword = await createPassword(userId, password);
        res.status(201).json(newPassword);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
