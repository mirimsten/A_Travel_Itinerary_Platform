import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../LogOut.css';

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
    <div className="log-out-container">
      <div className='logout-background'></div>
      <div className="log-out-box">

        <p>Are you sure that you want to log out?</p>
        <button onClick={handleLogout}>Yes</button>
        <button onClick={handleCancel}>No</button>
      </div>
    </div>
  );
};

export default LogOut;
