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
    likes: trip.likes,
    photos: trip.photos || [],
    videos: trip.videos || []
  });

  const [newPhotos, setNewPhotos] = useState([]);
  const [newVideos, setNewVideos] = useState([]);

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
      if (newPhotos.length > 0 || newVideos.length > 0) {
        await handleUpload();
      }
      const updatedTrip = {
        ...updateTrip,
        photos: [...updateTrip.photos, ...newPhotos.map(f => f.name)],
        videos: [...updateTrip.videos, ...newVideos.map(f => f.name)]
      };

      const response = await fetch(`http://localhost:8080/trips/${trip._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTrip)
      });

      if (!response.ok) {
        throw new Error('Did not receive expected data');
      }

      const json = await response.json();
      setUpdateTrip(json);
      setIsEditing(false);
      setNewPhotos([]);
      setNewVideos([]);
      setMove(false);
      setTrips(trips.map((trip) =>
        trip._id === updatedTrip._id ? { ...updatedTrip } : trip
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
    setNewPhotos([]);
    setNewVideos([]);
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

  const handlePhotoChange = (e) => {
    setNewPhotos(prevPhotos => [...prevPhotos, ...Array.from(e.target.files)]);
  };

  const handleVideoChange = (e) => {
    setNewVideos(prevVideos => [...prevVideos, ...Array.from(e.target.files)]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    newPhotos.forEach(photo => formData.append('photos', photo));
    newVideos.forEach(video => formData.append('videos', video));

    try {
      await fetch('http://localhost:8080/uploads', {
        method: 'POST',
        body: formData
      });
      alert('Files uploaded successfully');
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleDeleteFile = async (fileType, fileName) => {
    try {
      await fetch(`http://localhost:8080/uploads/${fileType}/${fileName}`, {
        method: 'DELETE'
      });
      await fetch(`http://localhost:8080/trips/${trip._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...updateTrip,
          [fileType]: updateTrip[fileType].filter(file => file !== fileName)
        })
      });
      setUpdateTrip(prevState => ({
        ...prevState,
        [fileType]: prevState[fileType].filter(file => file !== fileName)
      }));
    } catch (error) {
      console.error('Error deleting file:', error);
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
          <input type="file" multiple onChange={handlePhotoChange} />
          <input type="file" multiple onChange={handleVideoChange} />
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
            {updateTrip.photos && updateTrip.photos.length > 0 && updateTrip.photos.map((photo, index) => (
              <div key={index}>
                <img
                  src={`http://localhost:8080/${photo.replace(/\\/g, '/')}`}
                  alt={`Trip photo ${index + 1}`}
                  style={{ maxWidth: '100%' }}
                />
                {sameUser && <button onClick={() => handleDeleteFile('photos', photo)}>Delete</button>}
              </div>
            ))}
          </div>

          <div>
            {updateTrip.videos && updateTrip.videos.length > 0 && updateTrip.videos.map((video, index) => (
              <div key={index}>
                <video controls style={{ maxWidth: '100%' }}>
                  <source
                    src={`http://localhost:8080/${video.replace(/\\/g, '/')}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                {sameUser && <button onClick={() => handleDeleteFile('videos', video)}>Delete</button>}
              </div>
            ))}
          </div>
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
