import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom';

const TripItem = ({trip, id}) => {
  const [fetchError, setFetchError] = useState("");
  const [userName, setUserName] = useState("");
  const [move, setMove] = useState(false);
  useEffect(() => {
    
    fetch(`http://localhost:8080/users/id/${trip.userId}`, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => setUserName(data.userName))
        .catch((error) => setFetchError(error));
}, [])

if (move) {
  return <Navigate to={`/${trip._id}/trip`} />
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