import express from 'express';
import {
    getAllComments_ as getAllComments,
    getCommentsByTripId_ as getCommentsByTripId,
    getCommentById_ as getCommentById,
    createComment_ as createComment,
    updateComment_ as updateComment,
    deleteComment_ as deleteComment
} from '../controllers/commentController.js';

const router = express.Router();

// Route to retrieve all comments
router.get('/', getAllComments);

// Route to retrieve comments by trip ID
router.get('/post/:postId', getCommentsByTripId);

// Route to retrieve a comment by ID
router.get('/:id', getCommentById);

// Route to create a new comment
router.post('/', createComment);

// Route to update a comment
router.put('/:id', updateComment);

// Route to delete a comment
router.delete('/:id', deleteComment);

export default router;
