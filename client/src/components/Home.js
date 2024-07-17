import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

//   const usersInLS = localStorage.getItem('usersInLS');
//   const user = usersInLS ? JSON.parse(usersInLS)[0] : {};

  

  return (
    <div className='home'>        
        <Link to="/newTrip">create a new trip</Link>
    </div>
  )
}

export default Home;