import { getAllUsers, getUserById, createUser, updateUserById, deleteUserById } from '../models/userModel.js';

// Controller function to get all users
export const getUsers_ = async (req, res) => {
    // const { username } = req.query;//בצורה הזו או כמו בשאר העמודים??????????????...
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to get a user by ID
export const getUser_ = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: `User with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to create a new user
export const createUser_ = async (req, res) => {
    const userData = req.body;
    try {
        const newUser = await createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to update a user by ID
export const updateUser_ = async (req, res) => {
    const { id } = req.params;
    const userData = req.body;
    try {
        const updatedUser = await updateUserById(id, userData);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to delete a user by ID
export const deleteUser_ = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deleteUserById(id);
        if (result) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: `User with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// const users = getUsers_();
// console.log(users);