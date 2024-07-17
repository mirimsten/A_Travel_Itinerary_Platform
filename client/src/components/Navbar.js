import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const usersInLS = localStorage.getItem('usersInLS');
  const user = usersInLS ? JSON.parse(usersInLS)[0] : {};

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace('/logIn'); 
  };

  return (
    <nav className='navbar'>
      <Link to={`../users/${user.id}/info`}>Info</Link><br/>
      <Link to={`../users/${user.id}/trips`}>Trips</Link><br/>
      <Link to={`../users/${user.id}/messages`}>Messages</Link><br/>
      <Link to={`../users/${user.id}/newTrip`}>New trip</Link><br/>
      <Link to="#" onClick={handleLogout}>Logout</Link><br/>
      <Link to={`../users/${user.id}/home`}>Home</Link><br/>
    </nav>
  );
};

export default Navbar;