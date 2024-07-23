import React, { useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const CommentItem = ({ comment, updateComment, deleteComment, user }) => {

  const sameUser = comment.userId === user.id;

  const [isEditing, setEditing] = useState(false);
  const [updatedComment, setUpdatedComment] = useState({ ...comment });

  const handleSaveButton = () => {
    updateComment(updatedComment);
    setEditing(false);
  };

  const handleCancelUpdate = () => {
    setUpdatedComment({ ...comment });
    setEditing(false);
  };

  return (
    <li className='comments'>
        {isEditing ? (
          <>
            <input
              type="text"
              placeholder="Add Comment content"
              onChange={(event) => setUpdatedComment({ ...updatedComment, content: event.target.value })} />
            <input
              type="file"
              placeholder="Upload a photos"
              onChange={(event) => setUpdatedComment({ ...updatedComment, imageUrl: event.target.value })} />
              <button onClick={handleSaveButton}>Save</button>
              <button onClick={handleCancelUpdate}>Cancel</button>
          </>
        ) : (
          <div>
            <p>{user.userName}</p>
            <p>{comment.content}</p>
            <p>{comment.imageUrl}</p>
            {sameUser&&<>
            <button onClick={() => deleteComment(comment._id)}>
                <FaTrashAlt />
              </button>
              <button onClick={() => setEditing(true)}>
                <FaEdit />
              </button></>}
              <button>Blocking and reporting</button>
          </div>
        )}
    </li>
  );
};

export default CommentItem;
//לטפל בחסימה ודיווח וכל הקטע של התמונה.
