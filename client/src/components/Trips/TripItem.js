import React, { useState, useEffect } from 'react'
// import { Navigate } from 'react-router-dom';

const TripItem = ({ trip, setMove, setTrip, setUserName, userName }) => {
  const [fetchError, setFetchError] = useState("");
  const [fetching, setIsFetching] = useState(false);

  useEffect(() => {
    console.log(trip.userId);
    fetch(`http://localhost:8080/users/id/${trip.userId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setUserName(data[0].userName))
      .catch((error) => setFetchError(error));
  }, [])

  // if (move) {
  //   return (
  //     <Navigate 
  //       to={`../trips/${trip._id}/trip`} 
  //       state={{ trip: trip, id: id, userName: userName }} //, trips: trips, setTrips: setTrips
  //     />
  //   );
  // }
  return (
    <div>
      <button onDoubleClick={() => {
        setMove(true);
        setTrip(trip);
      }}>
        <p>{userName}</p>
        <p>{trip.country}</p>
        <p>{trip.likes}</p>
      </button>
    </div>
  );

}

export default TripItem