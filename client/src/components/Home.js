import React from 'react'
import { Link } from 'react-router-dom'
import '../Home.css'

const Home = () => {

  // const usersInLS = localStorage.getItem('usersInLS');
  // const user = usersInLS ? JSON.parse(usersInLS)[0] : {};

  

  return (
    <div className='home'>  
    <div className='home-background'></div>        
    <Link to={`../newTrip`}>create a new trip</Link>
    </div>
  )
}

export default Home;