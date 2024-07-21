import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace('/logIn'); 
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div>
      <p>Are you sure that you want to log out?</p>
      <button onClick={handleLogout}>Yes</button>
      <button onClick={handleCancel}>No</button>
    </div>
  );
};

export default LogOut;
