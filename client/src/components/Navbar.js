import React from 'react'
import { Link } from 'react-router-dom'
import '../Navbar.css';

const Navbar = () => {

  const usersInLS = localStorage.getItem('usersInLS');
  const user = usersInLS ? JSON.parse(usersInLS)[0] : {};

  return (
    <nav className='navbar'>
      <Link to={`../users/${user.id}/info`}>Info</Link><br/>
      <Link to={`../users/${user.id}/trips`}>Trips</Link><br/>
      <Link to={`../users/${user.id}/messages`}>Messages</Link><br/>
      <Link to={`../users/${user.id}/newTrip`}>New trip</Link><br/>
      <Link to={`../users/${user.id}/logOut`}>Logout</Link><br/>
      <Link to={`../users/${user.id}/home`}>Home</Link><br/>
      {user.isAdmin && (
      <>
        <Link to={`../users/${user.id}/home`}>Users</Link><br/>
      </>)}
    </nav>
  );
};

export default Navbar;