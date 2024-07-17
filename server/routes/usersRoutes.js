import express from 'express';
import {
    getUsers_ as getUsers,
    getUserById_ as getUserById,
    createUser_ as createUser,
    updateUser_ as updateUser,
    deleteUser_ as deleteUser
} from '../controllers/userController.js';

const router = express.Router();

// Route to retrieve all users
router.get('/', getUsers);

// Route to retrieve a user by ID
router.get('/:id', getUserById);

// Route to create a new user
router.post('/', createUser);

// Route to update a user
router.put('/:id', updateUser);

// Route to delete a user
router.delete('/:id', deleteUser);

export default router;
