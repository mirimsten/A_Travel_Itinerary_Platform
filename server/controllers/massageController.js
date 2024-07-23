import { getAllMassages, getMassagesByUserId, getMassageById, createMassage, updateMassage, deleteMassage } from '../models/massageModel.js';

// Controller function to retrieve all Massages
export const getAllMassages_ = async (req, res) => {
    // const { tripId } = req.query;
    try {
        // const Massages = await getAllMassages(tripId);
        const Massages = await getAllMassages();
        res.status(200).json(Massages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to retrieve Massages by trip ID
             
export const getMassagesByUserId_ = async (req, res) => {
    const { id } = req.params;
    try {
        const Massages = await getMassagesByUserId(id);
        res.status(200).json(Massages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to retrieve a Massage by ID
export const getMassageById_ = async (req, res) => {
    const { id } = req.params;
    try {
        const Massage = await getMassageById(id);
        if (Massage.length) {
            res.status(200).json(Massage);
        } else {
            // res.status(404).json({ message: `Massage with ID ${id} not found` });
            res.status(404).json(Massage);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to create a new Massage

export const createMassage_ = async (req, res) => {
    const { userId, content, isRead } = req.body;
    try {
        const newMassage = await createMassage(userId, content, isRead);
        res.status(201).json(newMassage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to update a Massage
export const updateMassage_ = async (req, res) => {
    const { id } = req.params;
    const { content, isRead } = req.body;
    try {
        const updatedMassage = await updateMassage(id, content, isRead);
        res.status(200).json(updatedMassage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to delete a Massage
export const deleteMassage_ = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deleteMassage(id);
        if (result) {
            res.status(200).json({ message: `Massage with ID ${id} deleted successfully` });
        } else {
            res.status(404).json({ message: `Massage with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};