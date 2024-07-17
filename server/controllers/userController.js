import { getAllUsers, getUserById, getUserByEmail, createUser, updateUserById, deleteUserById } from '../models/userModel.js';
import mongoose from 'mongoose';

// Controller function to get all users
export const getUsers_ = async (req, res) => {
    // const { id } = req.query;
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to get a user by ID
export const getUserById_ = async (req, res) => {
    const { id } = req.params;
    try {
        let user;
        if (!mongoose.Types.ObjectId.isValid(id)) {//במקרה שהמזהה לא תקין הוא גם לא ימצא אותו, נחזיר פלט שיכניס אותו לקונטרולר לאופציה שלא מצאו כזה משתמש.
            user = [];
        } else {
            user = await getUserById(id);
        }
        if (user.length) {
            res.status(200).json(user);
        } else {
            // res.status(404).json({ message: `User with ID ${id} not found` });
            res.status(404).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to get a user by ID
export const getUserByEmail_ = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await getUserByEmail(email);
        if (user.length) {
            res.status(200).json(user);
        } else {
            // res.status(404).json({ message: `User with email ${email} not found` });
            res.status(404).json(user);
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