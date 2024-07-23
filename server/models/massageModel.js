import { Massage } from './db.js';

// Retrieve all Massages
// export async function getAllMassages(tripId = 0) {
//     try {
//         if (tripId !== 0) {
//             const Massages = await Massage.find({ tripId: tripId });
//             return Massages;
//         } else {
//             const Massages = await Massage.find();
//             return Massages;
//         }
//     } catch (error) {
//         throw new Error(`Error retrieving Massages: ${error.message}`);
//     }
// }
export async function getAllMassages() {
    try {
            const Massages = await Massage.find();
            return Massages;
        } 
        catch (error) {
        throw new Error(`Error retrieving Massages: ${error.message}`);
    }
}

// Retrieve Massages by user ID
export async function getMassagesByUserId(userId) {
    try {
        const Massages = await Massage.find({ userId: userId });
        return Massages ? [Massages] : [];
    } catch (error) {
        throw new Error(`Error retrieving Massages by user ID ${userId}: ${error.message}`);
    }
}

// Retrieve a Massage by ID
export async function getMassageById(id) {
    try {
        const Massage = await Massage.findById(id);
        return Massage ? [Massage] : [];
    } catch (error) {
        throw new Error(`Error retrieving Massage with ID ${id}: ${error.message}`);
    }
}

// Create a new Massage
export async function createMassage(userId, content, isRead) {
    try {
        const Massage = new Massage({
            userId: userId,
            content: content,
            isRead: isRead
        });
        await Massage.save();
        return Massage ? [Massage] : [];
    } catch (error) {
        throw new Error(`Error creating Massage: ${error.message}`);
    }
}

// Update a Massage
export async function updateMassage(id, content, isReads) {
    try {
        const Massage = await Massage.findByIdAndUpdate(
            id,
            { content: content, isReads: isReads },
            { new: true }
        );
        return Massage ? [Massage] : [];
    } catch (error) {
        throw new Error(`Error updating Massage: ${error.message}`);
    }
}

// Delete a Massage
export async function deleteMassage(id) {
    try {
        const result = await Massage.findByIdAndDelete(id);
        return result ? true : false;
    } catch (error) {
        throw new Error(`Error deleting Massage: ${error.message}`);
    }
}