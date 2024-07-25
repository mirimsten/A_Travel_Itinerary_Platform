import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const Trip = ({ id, trips, setTrips, setMove, trip, setTrip, userName }) => {
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
    setUpdateTrip(prevState => ({
      ...prevState,
      likes: prevState.likes + 1
    }));

    console.log(updateTrip.likes);

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
      const tripData = new FormData();
      console.log(newPhotos);
      console.log(newVideos);
      if (newPhotos.length > 0 || newVideos.length > 0) {
        const uploadedFiles = await handleUpload();
        console.log("uploadedFiles"+" "+ uploadedFiles);
        if (uploadedFiles.photos) {
          uploadedFiles.photos.forEach((photo) => {
            tripData.append('photos', photo);
            console.log(photo);
          });
        }

        if (uploadedFiles.videos) {
          uploadedFiles.videos.forEach((video) => {
            tripData.append('videos', video);
            console.log(video);
          });
        }
      }

      tripData.append('title', updateTrip.title);
        tripData.append('country', updateTrip.country);
        tripData.append('description', updateTrip.description);
        tripData.append('duration', updateTrip.duration);
        
      console.log(updateTrip.likes);
        tripData.append('likes', updateTrip.likes);
        console.log(tripData);

        updateTrip.photos.forEach((photo) => {
          tripData.append('photos', photo);
          console.log(tripData);
        });

        updateTrip.videos.forEach((video) => {
          tripData.append('videos', video);
          console.log(tripData);
        });

      // const updatedTrip = {
      //   ...updateTrip,
      //   photos: [...updateTrip.photos, ...newPhotos.map(f => f.name)],
      //   videos: [...updateTrip.videos, ...newVideos.map(f => f.name)]
      // };

      const response = await fetch(`http://localhost:8080/trips/${trip._id}`, {
        method: 'PUT',
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        body: tripData
      });//JSON.stringify(updatedTrip)

      if (!response.ok) {
        throw new Error('Did not receive expected data');
      }

      const json = await response.json();
      console.log(json);
      // setUpdateTrip(json);
      // setIsEditing(false);
      // setNewPhotos([]);
      // setNewVideos([]);
      
      setTrips(trips.map((trip) =>
        trip._id === json._id ? { ...json[0] } : trip
      ));
      setTrip(json[0]);
      setIsEditing(false);
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

  const handlePhotoChange = (event) => {
    setNewPhotos(prevPhotos => [...prevPhotos, ...Array.from(event.target.files)]);
  };

  const handleVideoChange = (event) => {
    setNewVideos(prevVideos => [...prevVideos, ...Array.from(event.target.files)]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    newPhotos.forEach(photo => formData.append('photos', photo));
    newVideos.forEach(video => formData.append('videos', video));

    try {
      const uploadResponse = await fetch('http://localhost:8080/uploads', {
        method: 'POST',
        body: formData
      });
      if (uploadResponse.ok) {
        const uploadedFiles = await uploadResponse.json(); // קריאה לתוכן התגובה כ־JSON
        console.log('Files uploaded successfully:', uploadedFiles);
        return uploadedFiles; // החזרת התוכן המפורש של התגובה
    }
       else {
        const errorText = await uploadResponse.text();
        console.error('Failed to upload files:', errorText);
        return null;
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleDeleteFile = async (fileName, fileType) => {
    console.log(fileName)
    try {
      await fetch(`http://localhost:8080/uploads/${fileName}`, {
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
      setTrip({
        ...updateTrip,
        [fileType]: updateTrip[fileType].filter(file => file !== fileName)
      })
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <div>
      <button onClick={() => setMove(false)}>X</button>
      {isEditing ? (
        <>
          <label htmlFor="title">Title:</label>
          <input
            type='text'
            value={updateTrip.title}
            onChange={(e) => setUpdateTrip({ ...updateTrip, title: e.target.value })}
            name="title"
            id="title"
          />
          <label htmlFor="country">Country:</label>
          <input
            type='text'
            value={updateTrip.country}
            onChange={(e) => setUpdateTrip({ ...updateTrip, country: e.target.value })}
            name="country"
            id="country"
          />
          <label htmlFor="description">Description:</label>
          <textarea
            value={updateTrip.description}
            onChange={(e) => setUpdateTrip({ ...updateTrip, description: e.target.value })}
            name="description"
            id="description"
          />
          <label htmlFor="duration">Duration:</label>
          <input
            type='text'
            value={updateTrip.duration}
            onChange={(e) => setUpdateTrip({ ...updateTrip, duration: e.target.value })}
            name="duration"
            id="duration"
          />
          <label htmlFor="photos">Add Photos:</label>
          <input
            type="file"
            multiple
            onChange={(event) => handlePhotoChange(event)}
            name="photos"
            id="photos"
          />
          <div>
            {Array.from(newPhotos).map((photo, index) => (
              <div key={index}>{photo.name}</div>
            ))}
          </div>
          <label htmlFor="videos">Add Videos:</label>
          <input
            type="file"
            multiple
            onChange={(event) => handleVideoChange(event)}
            name="videos"
            id="videos"
          />
          <div>
            {Array.from(newVideos).map((video, index) => (
              <div key={index}>{video.name}</div>
            ))}
          </div>
          <button onClick={handleSaveButton}>Save</button>
          <button onClick={handleCancelUpdate}>Cancel</button>
        </>
      ) : (
        <>
          <p>{updateTrip.title}</p>
          <p>Publisher Name: {userName}</p>
          <p>{updateTrip.country}</p>
          <p>{updateTrip.description}</p>
          <p>{updateTrip.duration}</p>
          {(!sameUser) ? (<button onClick={handleLikeButtonClick}>{updateTrip.likes} 👍🏻</button>) : (
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
                {sameUser && <button onClick={() => handleDeleteFile(photo, 'photos')}>Delete</button>}
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
                {sameUser && <button onClick={() => handleDeleteFile(video, "videos")}>Delete</button>}
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
