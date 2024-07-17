// import { pool } from './db.js';

// //--------------comments-----------------

// // Retrieve all comments
// export async function getAllComments(tripId = 0) {
//     try {
//         if(tripId !== 0){
//             const [rows] = await pool.query("SELECT * FROM comments WHERE tripId = ?", [tripId]);
//             return rows;
//         }else{
//             const [rows] = await pool.query("SELECT * FROM comments");
//             return rows;
//         }
        
//     } catch (error) {
//         throw new Error(`Error retrieving comments: ${error.message}`);
//     }
// }

// // Retrieve comments by trip ID
// export async function getCommentsByTripId(id) {
//     try {
//         const [rows] = await pool.query("SELECT * FROM comments WHERE tripId = ?", [id]);
//         return rows;
//     } catch (error) {
//         throw new Error(`Error retrieving comments by trip ID ${id}: ${error.message}`);
//     }
// }

// // Retrieve a comment by ID
// export async function getCommentById(id) {
//     try {
//         const [rows] = await pool.query("SELECT * FROM comments WHERE id = ?", [id]);
//         return rows;
//     } catch (error) {
//         throw new Error(`Error retrieving comment with ID ${id}: ${error.message}`);
//     }
// }

// // Create a new comment
// export async function createComment(tripId, userId, userName, body, photo) {
//     try {
//         const [result] = await pool.query("INSERT INTO comments (tripId, userId, userName, body, photo) VALUES (?, ?, ?, ?, ?)", [tripId, userId, userName, body, photo]);
//         const id = result.insertId;
//         return getCommentById(id);
//     } catch (error) {
//         throw new Error(`Error creating comment: ${error.message}`);
//     }
// }

// // Update a comment
// export async function updateComment(id, body, photo) {
//     try {
//         const [result] = await pool.query("UPDATE comments SET photo = ?, body = ? WHERE id = ?", [photo, body, id]);
//         if (result.affectedRows === 1) {
//             return getCommentById(id);
//         } else {
//             throw new Error(`Comment with ID ${id} not found`);
//         }
//     } catch (error) {
//         throw new Error(`Error updating comment: ${error.message}`);
//     }
// }

// // Delete a comment
// export async function deleteComment(id) {
//     try {
//         const [result] = await pool.query("DELETE FROM comments WHERE id = ?", [id]);
//         if (result.affectedRows === 1) {
//             return true;
//         } else {
//             throw new Error(`Comment with ID ${id} not found`);
//         }
//     } catch (error) {
//         throw new Error(`Error deleting comment: ${error.message}`);
//     }
// }

















import { Comment } from './db.js';

// Retrieve all comments
export async function getAllComments(tripId = 0) {
    try {
        if (tripId !== 0) {
            const comments = await Comment.find({ tripId: tripId });
            return comments;
        } else {
            console.log("ggggggg")
            const comments = await Comment.find();
            console.log("hhhhhhh")
            return comments;
        }
    } catch (error) {
        throw new Error(`Error retrieving comments: ${error.message}`);
    }
}

// Retrieve comments by trip ID
export async function getCommentsByTripId(id) {
    try {
        const comments = await Comment.find({ tripId: id });
        return comments;
    } catch (error) {
        throw new Error(`Error retrieving comments by trip ID ${id}: ${error.message}`);
    }
}

// Retrieve a comment by ID
export async function getCommentById(id) {
    try {
        const comment = await Comment.findOne({ commentId: id });
        return comment;
    } catch (error) {
        throw new Error(`Error retrieving comment with ID ${id}: ${error.message}`);
    }
}

// Create a new comment
export async function createComment(tripId, userId, username, commentContent, photoUpload) {
    try {
        const comment = new Comment({
            tripId: tripId,
            userId: userId,
            username: username,
            commentContent: commentContent,
            photoUpload: photoUpload
        });
        await comment.save();
        return comment;
    } catch (error) {
        throw new Error(`Error creating comment: ${error.message}`);
    }
}

// Update a comment
export async function updateComment(id, commentContent, photoUpload) {
    try {
        const comment = await Comment.findOneAndUpdate(
            { commentId: id },
            { commentContent: commentContent, photoUpload: photoUpload },
            { new: true }
        );
        if (comment) {
            return comment;
        } else {
            throw new Error(`Comment with ID ${id} not found`);
        }
    } catch (error) {
        throw new Error(`Error updating comment: ${error.message}`);
    }
}

// Delete a comment
export async function deleteComment(id) {
    try {
        const result = await Comment.deleteOne({ commentId: id });
        if (result.deletedCount === 1) {
            return true;
        } else {
            throw new Error(`Comment with ID ${id} not found`);
        }
    } catch (error) {
        throw new Error(`Error deleting comment: ${error.message}`);
    }
}
