import React, { useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const MassageItem = ({ Massage, updateMassage, deleteMassage, user }) => {

  const sameUser = Massage.userId === user.id;
  const isAdmin = user.isAdmin;

  const [isEditing, setisEditing] = useState(false);
  const [updatedMassage, setUpdatedMassage] = useState({ ...Massage });

  const handleSaveButton = () => {
    updateMassage(updatedMassage);
    setisEditing(false);
  };

  const handleCancelUpdate = () => {
    setUpdatedMassage({ ...Massage });
    setisEditing(false);
  };

  return (
    <li className='Massages'>
        {isEditing ? (
          <>
            <input
              type="text"
              placeholder="Add Massage content"
              onChange={(event) => setUpdatedMassage({ ...updatedMassage, content: event.target.value })} />
            
              <button onClick={handleSaveButton}>Save</button>
              <button onClick={handleCancelUpdate}>Cancel</button>
          </>
        ) : (
          <div>
            <p>{user.userName}</p>
            <p>{Massage.content}</p>
            {sameUser && 
            <>
            <button onClick={() => deleteMassage(Massage._id)}>
                <FaTrashAlt />
              </button>
              {isAdmin && <>
                <button onClick={() => setisEditing(true)}>
                <FaEdit />
              </button>
              </>
              }
              
              </>}
          </div>
        )}
    </li>
  );
};

export default MassageItem;