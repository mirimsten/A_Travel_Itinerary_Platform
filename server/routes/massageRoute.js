import express from 'express';
import {
    getAllMassages_ as getAllMassages,
    getMassageById_ as getMassageById,
    getMassagesByUserId_ as getMassageByUserId,
    createMassage_ as createMassage,
    updateMassage_ as updateMassage,
    deleteMassage_ as deleteMassage
} from '../controllers/massageController.js';

const router = express.Router();

// Route to retrieve all comments
router.get('/', getAllMassages);

// Route to retrieve a comment by ID
router.get('/id/:id', getMassageById);

router.get('/userId/:id', getMassageByUserId);

// Route to create a new comment
router.post('/', createMassage);

// Route to update a comment
router.put('/:id', updateMassage);

// Route to delete a comment
router.delete('/:id', deleteMassage);

export default router;