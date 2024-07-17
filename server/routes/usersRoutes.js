import express from 'express';
import {
    getUsers_ as getUsers,
    getUserById_ as getUserById,
    getUserByEmail_ as getUserByEmail,
    createUser_ as createUser,
    updateUser_ as updateUser,
    deleteUser_ as deleteUser
} from '../controllers/userController.js';

const router = express.Router();

// Route to retrieve all users
router.get('/', getUsers);

// Route to retrieve a user by ID
router.get('/id/:id', getUserById);

// Route to retrieve a user by email
router.get('/email/:email', getUserByEmail);

// Route to create a new user
router.post('/', createUser);

// Route to update a user
router.put('/:id', updateUser);

// Route to delete a user
router.delete('/:id', deleteUser);

export default router;
