import React, { useState } from 'react'

const AddTrip = ({ id, addTripToState }) => {

  const [newTrip, setNewTrip] = useState({
    title: "",
    country: "",
    description: "",
    duration: "",
    photos: [],
    videos: []
  });

  const handleChangeNewTrip = (event, type) => {
    const value = event.target.value;
    const files = Array.from(event.target.files || []);

    setNewTrip(prevTrip => {
      if (type === 'photos' || type === 'videos') {
        return {
          ...prevTrip,
          [type]: [...prevTrip[type], ...files]
        };
      } else {
        return {
          ...prevTrip,
          [type]: value
        };
      }
    });
    console.log(newTrip);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    // בדיקה שהשדות הנדרשים מלאים
    if (!newTrip.title || !newTrip.country || !newTrip.description || !newTrip.duration) {
      alert('Please fill all required fields.');
      return;
    }

    // יצירת אובייקט formData חדש לתמונות ולסרטונים
    const photoVideoData = new FormData();
    newTrip.photos.forEach((photo) => {
      photoVideoData.append('photos', photo);
    });

    newTrip.videos.forEach((video) => {
      photoVideoData.append('videos', video);
    });

    try {
      // שליחת התמונות והסרטונים לשרת
      const uploadResponse = await fetch('http://localhost:8080/uploads', {
        method: 'POST',
        body: photoVideoData
      });

      if (uploadResponse.ok) {
        const uploadedFiles = await uploadResponse.json();
        console.log('Files uploaded successfully:', uploadedFiles);

        // יצירת אובייקט formData חדש לטיול
        const tripData = new FormData();
        tripData.append('title', newTrip.title);
        tripData.append('userId', id);
        tripData.append('country', newTrip.country);
        tripData.append('description', newTrip.description);
        tripData.append('duration', newTrip.duration);

        // הוספת שמות הקבצים החדשים ל-tripData
        if (uploadedFiles.photos) {
          uploadedFiles.photos.forEach((photo) => {
            tripData.append('photos', photo);
          });
        }

        if (uploadedFiles.videos) {
          uploadedFiles.videos.forEach((video) => {
            tripData.append('videos', video);
          });
        }

        // שליחת נתוני הטיול לשרת
        const tripResponse = await fetch('http://localhost:8080/trips', {
          method: 'POST',
          body: tripData
        });

        if (tripResponse.ok) {
          console.log('Trip added successfully');
          const newTrip = await tripResponse.json();
          console.log(newTrip);
          addTripToState(newTrip);
        } else {
          const errorText = await tripResponse.text();
          console.error('Failed to add trip:', errorText);
        }
      } else {
        const errorText = await uploadResponse.text();
        console.error('Failed to upload files:', errorText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        placeholder="Title"
        onChange={(event) => handleChangeNewTrip(event, 'title')}
        name="title"
        id="title"
        required
      />
      <label htmlFor="country">Country:</label>
      <input
        type="text"
        placeholder="Country"
        onChange={(event) => handleChangeNewTrip(event, 'country')}
        name="country"
        id="country"
        required
      />
      <label htmlFor="description">Description:</label>
      <textarea
        placeholder="Description"
        onChange={(event) => handleChangeNewTrip(event, 'description')}
        name="description"
        id="description"
        rows="7"
        required
      />
      <label htmlFor="duration">Duration:</label>
      <input
        type="text"
        placeholder="Duration"
        onChange={(event) => handleChangeNewTrip(event, 'duration')}
        name="duration"
        id="duration"
        required
      />
      <label htmlFor="photos">Upload Photos:</label>
      <input
        type="file"
        multiple
        onChange={(event) => handleChangeNewTrip(event, 'photos')}
        name="photos"
        id="photos"
      />
      <div>
        {Array.from(newTrip.photos).map((photo, index) => (
          <div key={index}>{photo.name}</div>
        ))}
      </div>
      <label htmlFor="videos">Upload Videos:</label>
      <input
        type="file"
        multiple
        onChange={(event) => handleChangeNewTrip(event, 'videos')}
        name="videos"
        id="videos"
      />
      <div>
        {Array.from(newTrip.videos).map((video, index) => (
          <div key={index}>{video.name}</div>
        ))}
      </div>
      <button type="submit">Add Trip</button>
    </form>
  );
};

export default AddTrip;

