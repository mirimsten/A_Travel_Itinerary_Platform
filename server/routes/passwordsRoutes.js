import express from 'express';
import {
    getPassword_ as getPasswordHandler,
    createPassword_ as createPasswordHandler
} from '../controllers/passwordController.js';

const router = express.Router();

// Route to retrieve the latest password for a user by user ID
router.get('/:id', getPasswordHandler);

// Route to create a new password for a user
router.post('/', createPasswordHandler);

export default router;