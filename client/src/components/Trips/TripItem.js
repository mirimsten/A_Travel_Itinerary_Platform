import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom';

const TripItem = ({ trip, id, trips, setTrips}) => {
  const [fetchError, setFetchError] = useState("");
  const [userName, setUserName] = useState("");
  const [move, setMove] = useState(false);
  useEffect(() => {
console.log(trip.userId);
    fetch(`http://localhost:8080/users/id/${trip.userId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setUserName(data[0].userName))
      .catch((error) => setFetchError(error));
  }, [])

  if (move) {
    console.log('Navigating with state:', { trip: trip, id: id, userName: userName, trips: trips, setTrips: setTrips});
    return (
      <Navigate 
        to={`../trips/${trip._id}/trip`} 
        state={{ trip: trip, id: id, userName: userName, trips: trips, setTrips: setTrips }} 
      />
    );
  }
  return (
    <div>
      <button onDoubleClick={() => setMove(true)}>
        <p>{userName}</p>
        <p>{trip.country}</p>
        <p>{trip.likes}</p>
      </button>
    </div>
  );
}

export default TripItem