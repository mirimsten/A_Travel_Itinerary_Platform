import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';

const Info = () => {
  const user = JSON.parse(localStorage.getItem('usersInLS'))[0];
  const [edit, setEdit] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    id: user.id,
    userName: user.userName,
    email: user.email,
    address: user.address,
    phone: user.phone,
    isAdmin: user.isAdmin,
    isBlocked: user.isBlocked,
  });

  const handleSaveUserDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      console.log(json);
      localStorage.setItem('usersInLS', JSON.stringify([updatedUser]));
      setEdit(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancelUserDetails = () => {
    setUpdatedUser({
      ...updatedUser,
      userName: user.userName,
      address: user.address,
      phone: user.phone,
    });
    setEdit(false);
  };

  return (
    <div className="user-info">
      {!edit ? (
        <>
          <h2>User Information</h2>
          <p>
            <strong>Username:</strong> {updatedUser.userName}
          </p>
          <p>
            <strong>Email:</strong> {updatedUser.email}
          </p>
          <p>
            <strong>Address:</strong> {updatedUser.address}
          </p>
          <p>
            <strong>Phone:</strong> {updatedUser.phone}
          </p>
          <button onClick={() => setEdit(true)}>
            <FaEdit />
          </button>
        </>
      ) : (
        <>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={updatedUser.userName}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, userName: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              value={updatedUser.address}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, address: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              value={updatedUser.phone}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, phone: e.target.value })
              }
            />
          </div>
          <button onClick={handleSaveUserDetails}>Save</button>
          <button onClick={handleCancelUserDetails}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default Info;
