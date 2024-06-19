import { getAllComments, getCommentsByTripId, getCommentById, createComment, updateComment, deleteComment } from '../models/commentModel.js';

// Controller function to retrieve all comments
export const getAllComments_ = async (req, res) => {
    const { tripId } = req.query;
    try {
        const comments = await getAllComments(tripId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to retrieve comments by trip ID
export const getCommentsByTripId_ = async (req, res) => {
    const { tripId } = req.params;
    try {
        const comments = await getCommentsByTripId(tripId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to retrieve a comment by ID
export const getCommentById_ = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await getCommentById(id);
        if (comment) {
            res.status(200).json(comment);
        } else {
            res.status(404).json({ message: `Comment with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to create a new comment
export const createComment_ = async (req, res) => {
    const { tripId, userId, userName, body, photo } = req.body;
    try {
        const newComment = await createComment(tripId, userId, userName, body, photo);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to update a comment
export const updateComment_ = async (req, res) => {
    const { id } = req.params;
    const { body, photo } = req.body;
    try {
        const updatedComment = await updateComment(id, body, photo);
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to delete a comment
export const deleteComment_ = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deleteComment(id);
        if (result) {
            res.status(200).json({ message: `Comment with ID ${id} deleted successfully` });
        } else {
            res.status(404).json({ message: `Comment with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
