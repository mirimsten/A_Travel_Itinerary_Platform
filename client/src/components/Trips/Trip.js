import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const Trip = () => {
  const location = useLocation();
  const { trip, id, userName, trips, setTrips } = location.state;

  const[isFetching, setIsFetching] = useState(false);
  const[fetchError, setFetchError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const sameUser = trip.userId === id;

  const [updateTrip, setUpdateTrip] = useState({
    title: trip.title,
    country: trip.country,
    description: trip.description,
    duration: trip.duration,
    likes: trip.likes,
    photos: trip.photos || [], // Initialize with existing photos
    videos: trip.videos || []  // Initialize with existing videos
  });

  const [newPhotos, setNewPhotos] = useState([]);
  const [newVideos, setNewVideos] = useState([]);

  const handleSaveButton = async () => {
    try {
      await fetch(`http://localhost:8080/trips/${trip._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...updateTrip,
          photos: [...updateTrip.photos, ...newPhotos.map(f => f.name)],
          videos: [...updateTrip.videos, ...newVideos.map(f => f.name)]
        })
      });
      setIsEditing(false);
      // Reset new files
      setNewPhotos([]);
      setNewVideos([]);
    } catch (error) {
      console.error('Error updating trip:', error);
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
            method: 'DELETE',
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Did not receive expected data');
            }
            // let json = response.json();
            // console.log(json);
            setTrips(trips.filter((trip) =>
                trip._id !== idToDelete))
        })
    } catch (error) {
        setFetchError(error);
    } finally {
        setIsFetching(false);
    }
  }

  const handlePhotoChange = (e) => {
    setNewPhotos([...e.target.files]);
  };

  const handleVideoChange = (e) => {
    setNewVideos([...e.target.files]);
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
      // Refresh the trip details
      await handleSaveButton();
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleDeleteFile = async (fileType, fileName) => {
    try {
      await fetch(`http://localhost:8080/trips/${trip._id}/${fileType}/${fileName}`, {
        method: 'DELETE'
      });
      // Remove deleted file from state
      setUpdateTrip(prevState => ({
        ...prevState,
        [fileType]: prevState[fileType].filter(file => file !== fileName)
      }));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };
  // if (!location.state) {
  //   console.log('Location state is null');
  //   return <p>Error: No trip data found</p>;
  // }

  
  // console.log('Received state:', { trip, id, userName });

  return (
    <div>
      {isEditing?(
        <>
        <input
            type='text'
            value={updateTrip.title}
            onChange={(e) => setUpdateTrip({...updateTrip, title: e.target.value})}
          />
          <input
            type='text'
            value={updateTrip.country}
            onChange={(e) => setUpdateTrip({...updateTrip, country: e.target.value})}
          />
          <textarea
            value={updateTrip.description}
            onChange={(e) => setUpdateTrip({...updateTrip, description: e.target.value})}
          />
          <input
            type='text'
            value={updateTrip.duration}
            onChange={(e) => setUpdateTrip({...updateTrip, duration: e.target.value})}
          />
          <input type="file" multiple onChange={handlePhotoChange} />
          <input type="file" multiple onChange={handleVideoChange} />
          <button onClick={handleUpload}>Upload Files</button>
          <button onClick={handleSaveButton}>Save</button>
          <button onClick={handleCancelUpdate}>Cancel</button>
        </>
      ):(
        <>
      {/* <p>{trip.title}</p>
      <p>{userName}</p>
      <p>{trip.country}</p>
      <p>{trip.description}</p>
      <p>{trip.duration}</p>
      <p>{trip.likes} 👍🏻</p> */}
      <p>{updateTrip.title}</p>
          <p>{userName}</p>
          <p>{updateTrip.country}</p>
          <p>{updateTrip.description}</p>
          <p>{updateTrip.duration}</p>
          <p>{updateTrip.likes} 👍🏻</p>
    
          <div>
            {updateTrip.photos && updateTrip.photos.length > 0 && updateTrip.photos.map((photo, index) => (
              <div key={index}>
                <img src={`http://localhost:8080/uploads/${photo}`} alt={`Trip photo ${index + 1}`} style={{ maxWidth: '100%' }} />
                {sameUser && <button onClick={() => handleDeleteFile('photos', photo)}>Delete</button>}
              </div>
            ))}
          </div>

          <div>
            {updateTrip.videos && updateTrip.videos.length > 0 && updateTrip.videos.map((video, index) => (
              <div key={index}>
                <video controls style={{ maxWidth: '100%' }}>
                  <source src={`http://localhost:8080/uploads/${video}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {sameUser && <button onClick={() => handleDeleteFile('videos', video)}>Delete</button>}
              </div>
            ))}
          </div>
          <div>
            {/* <button onClick={() => onClick()}>Read more</button> */}
            {sameUser && <button className='todoButton' onClick={() => deleteTrip(trip._id)}>
              <FaTrashAlt />
            </button>}
            {sameUser && <button className='todoButton' onClick={() => setIsEditing(true)}>
              <FaEdit />
            </button>}
          </div>
          </>)}
      
      <button>Comments</button>
      <button>Blocking and reporting</button>
    </div>
  );
}

export default Trip;

{/* <input
            type='number'
            value={updateTrip.likes}
            onChange={(e) => setUpdateTrip({...updateTrip, likes: e.target.value})}
          /> */}

      
//       <div>
//         {trip.photos && trip.photos.length > 0 && trip.photos.map((photo, index) => (
//           <img key={index} src={photo} alt={`Trip photo ${index + 1}`} style={{ maxWidth: '100%' }} />
//         ))}
//       </div>
      
//       <div>
//         {trip.videos && trip.videos.length > 0 && trip.videos.map((video, index) => (
//           <video key={index} controls style={{ maxWidth: '100%' }}>
//             <source src={video} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         ))}
//       </div>
      
//     </div>
//   );
// }

// export default Trip;







// const updatePost = async (postUpdate) => {
//     try {
//         setIsFetching(true);
//         await fetch(`${API_URL}/${postUpdate.id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(postUpdate)
//         }).then((response) => {
//             if (!response.ok) {
//                 throw new Error('Did not receive expected data');
//             }
//             let json = response.json();
//             console.log(json);
//             setPosts(posts.map((post) =>
//                 post.id === postUpdate.id ? { ...postUpdate } : post))
//         })

//     } catch (error) {
//         setFetchError(error);
//     } finally {
//         setIsFetching(false);
//     }
// }



// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { FaTrashAlt, FaEdit } from 'react-icons/fa';

// const Trip = () => {
//   const location = useLocation();
//   const { trip, id, userName, trips, setTrips } = location.state;

//   const [isFetching, setIsFetching] = useState(false);
//   const [fetchError, setFetchError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const sameUser = trip.userId === id;

//   const [updateTrip, setUpdateTrip] = useState({
//     title: trip.title,
//     country: trip.country,
//     description: trip.description,
//     duration: trip.duration,
//     likes: trip.likes,
//     photos: trip.photos || [],
//     videos: trip.videos || []
//   });

//   const [newPhotos, setNewPhotos] = useState([]);
//   const [newVideos, setNewVideos] = useState([]);

//   const handleSaveButton = async () => {
//     try {
//       await fetch(`http://localhost:8080/trips/${trip._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           ...updateTrip,
//           photos: [...updateTrip.photos, ...newPhotos.map(f => f.name)],
//           videos: [...updateTrip.videos, ...newVideos.map(f => f.name)]
//         })
//       });
//       setIsEditing(false);
//       setNewPhotos([]);
//       setNewVideos([]);
//     } catch (error) {
//       console.error('Error updating trip:', error);
//     }
//   };

//   const handleCancelUpdate = () => {
//     setUpdateTrip({
//       title: trip.title,
//       country: trip.country,
//       description: trip.description,
//       duration: trip.duration,
//       likes: trip.likes,
//       photos: trip.photos,
//       videos: trip.videos
//     });
//     setNewPhotos([]);
//     setNewVideos([]);
//     setIsEditing(false);
//   };

//   const deleteTrip = async (idToDelete) => {
//     try {
//       setIsFetching(true);
//       await fetch(`http://localhost:8080/trips/${idToDelete}`, {
//         method: 'DELETE',
//       }).then((response) => {
//         if (!response.ok) {
//           throw new Error('Did not receive expected data');
//         }
//         setTrips(trips.filter((trip) => trip._id !== idToDelete));
//       });
//     } catch (error) {
//       setFetchError(error);
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   const handlePhotoChange = (e) => {
//     setNewPhotos(Array.from(e.target.files));
//   };

//   const handleVideoChange = (e) => {
//     setNewVideos(Array.from(e.target.files));
//   };

//   const handleUpload = async () => {
//     const formData = new FormData();
//     newPhotos.forEach(photo => formData.append('photos', photo));
//     newVideos.forEach(video => formData.append('videos', video));

//     try {
//       await fetch('http://localhost:8080/uploads', {
//         method: 'POST',
//         body: formData
//       });
//       alert('Files uploaded successfully');
//       await handleSaveButton();
//     } catch (error) {
//       console.error('Error uploading files:', error);
//     }
//   };

//   const handleDeleteFile = async (fileType, fileName) => {
//     try {
//       await fetch(`http://localhost:8080/uploads/${fileType}/${fileName}`, {
//         method: 'DELETE'
//       });
//       setUpdateTrip(prevState => ({
//         ...prevState,
//         [fileType]: prevState[fileType].filter(file => file !== fileName)
//       }));
//     } catch (error) {
//       console.error('Error deleting file:', error);
//     }
//   };

//   return (
//     <div>
//       {isEditing ? (
//         <>
//           <input
//             type='text'
//             value={updateTrip.title}
//             onChange={(e) => setUpdateTrip({ ...updateTrip, title: e.target.value })}
//           />
//           <input
//             type='text'
//             value={updateTrip.country}
//             onChange={(e) => setUpdateTrip({ ...updateTrip, country: e.target.value })}
//           />
//           <textarea
//             value={updateTrip.description}
//             onChange={(e) => setUpdateTrip({ ...updateTrip, description: e.target.value })}
//           />
//           <input
//             type='text'
//             value={updateTrip.duration}
//             onChange={(e) => setUpdateTrip({ ...updateTrip, duration: e.target.value })}
//           />
//           <input type="file" multiple onChange={handlePhotoChange} />
//           <input type="file" multiple onChange={handleVideoChange} />
//           <button onClick={handleUpload}>Upload Files</button>
//           <button onClick={handleSaveButton}>Save</button>
//           <button onClick={handleCancelUpdate}>Cancel</button>
//         </>
//       ) : (
//         <>
//           <p>{updateTrip.title}</p>
//           <p>{userName}</p>
//           <p>{updateTrip.country}</p>
//           <p>{updateTrip.description}</p>
//           <p>{updateTrip.duration}</p>
//           <p>{updateTrip.likes} 👍🏻</p>

//           <div>
//             {updateTrip.photos && updateTrip.photos.length > 0 && updateTrip.photos.map((photo, index) => (
//               <div key={index}>
//                 <img src={`http://localhost:8080/uploads/${photo}`} alt={`Trip photo ${index + 1}`} style={{ maxWidth: '100%' }} />
//                 {sameUser && <button onClick={() => handleDeleteFile('photos', photo)}>Delete</button>}
//               </div>
//             ))}
//           </div>

//           <div>
//             {updateTrip.videos && updateTrip.videos.length > 0 && updateTrip.videos.map((video, index) => (
//               <div key={index}>
//                 <video controls style={{ maxWidth: '100%' }}>
//                   <source src={`http://localhost:8080/uploads/${video}`} type="video/mp4" />
//                   Your browser does not support the video tag.
//                 </video>
//                 {sameUser && <button onClick={() => handleDeleteFile('videos', video)}>Delete</button>}
//               </div>
//             ))}
//           </div>

//           <div>
//             {sameUser && <button className='todoButton' onClick={() => deleteTrip(trip._id)}>
//               <FaTrashAlt />
//             </button>}
//             {sameUser && <button className='todoButton' onClick={() => setIsEditing(true)}>
//               <FaEdit />
//             </button>}
//           </div>
//         </>
//       )}
//       <button>Comments</button>
//       <button>Blocking and reporting</button>
//     </div>
//   );
// }

// export default Trip;

