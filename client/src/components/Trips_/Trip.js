import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const Trip = ({ id, trips, setTrips, setMove, trip, userName }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const sameUser = trip.userId === id;

  const [updateTrip, setUpdateTrip] = useState({
    title: trip.title,
    country: trip.country,
    description: trip.description,
    duration: trip.duration,
    likes: trip.likes
  });

  const handleLikeButtonClick = async () => {
    const updatedTrip = {
        ...updateTrip,
        likes: updateTrip.likes + 1
    };
    setUpdateTrip(updatedTrip);
    try {
        setIsFetching(true);
        await handleSaveButton();
    } catch (error) {
        console.error('Failed to update likes on server:', error);
    } finally {
        setIsFetching(false);
    }
};

  const handleSaveButton = async () => {
    try {
      setIsFetching(true);

      const response = await fetch(`http://localhost:8080/trips/${trip._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateTrip)
      });

      if (!response.ok) {
        throw new Error('Did not receive expected data');
      }

      const json = await response.json();
      setUpdateTrip(json);
      setIsEditing(false);
      setMove(false);
      setTrips(trips.map((trip) =>
        trip._id === updateTrip._id ? { ...updateTrip } : trip
      ));

    } catch (error) {
      setFetchError('Error updating trip: ' + error.message);
    } finally {
      setIsFetching(false);
    }
  };

  const handleCancelUpdate = () => {
    setUpdateTrip({
      title: trip.title,
      country: trip.country,
      description: trip.description,
      duration: trip.duration,
      likes: trip.likes,
      photos: trip.photos,
      videos: trip.videos
    });
    setIsEditing(false);
  };

  const deleteTrip = async (idToDelete) => {
    try {
      setIsFetching(true);
      await fetch(`http://localhost:8080/trips/${idToDelete}`, {
        method: 'DELETE'
      });
      setTrips(trips.filter((trip) => trip._id !== idToDelete));
      setMove(false);
    } catch (error) {
      setFetchError('Error deleting trip: ' + error.message);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div>
      <button onClick={() => setMove(false)}>X</button>
      {isEditing ? (
        <>
          <input
            type='text'
            value={updateTrip.title}
            onChange={(e) => setUpdateTrip({ ...updateTrip, title: e.target.value })}
          />
          <input
            type='text'
            value={updateTrip.country}
            onChange={(e) => setUpdateTrip({ ...updateTrip, country: e.target.value })}
          />
          <textarea
            value={updateTrip.description}
            onChange={(e) => setUpdateTrip({ ...updateTrip, description: e.target.value })}
          />
          <input
            type='text'
            value={updateTrip.duration}
            onChange={(e) => setUpdateTrip({ ...updateTrip, duration: e.target.value })}
          />
          <button onClick={handleSaveButton}>Save</button>
          <button onClick={handleCancelUpdate}>Cancel</button>
        </>
      ) : (
        <>
          <p>{updateTrip.title}</p>
          <p>{userName}</p>
          <p>{updateTrip.country}</p>
          <p>{updateTrip.description}</p>
          <p>{updateTrip.duration}</p>
          {(!sameUser)?(<button onClick={handleLikeButtonClick}>{updateTrip.likes} 👍🏻</button>):(
            <p>{updateTrip.likes} 👍🏻</p>
          )}
          <div>
            {sameUser && <button onClick={() => deleteTrip(trip._id)}>
              <FaTrashAlt />
            </button>}
            {sameUser && <button onClick={() => setIsEditing(true)}>
              <FaEdit />
            </button>}
          </div>
          <Link to={`../trips/${trip._id}/comments`} >Comments</Link>
          <button>Blocking and reporting</button>
        </>
      )}
    </div>
  );
}

export default Trip;
