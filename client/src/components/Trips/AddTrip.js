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

  // const handleChangeNewTrip = (event, type) => {
  //   if (type === 'photos' || type === 'videos') {
  //     setNewTrip({
  //       ...newTrip,
  //       [type]: [...newTrip[type], ...event.target.files]
  //     });
  //   } else {
  //     setNewTrip({
  //       ...newTrip,
  //       [type]: event.target.value
  //     });
  //   }
  // };

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
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append('title', newTrip.title);
  //   formData.append('country', newTrip.country);
  //   formData.append('description', newTrip.description);

  //   for (let i = 0; i < newTrip.images.length; i++) {
  //     formData.append('images', newTrip.images[i]);
  //   }

  //   try {
  //     const response = await fetch('http://localhost:8080/trips', {
  //       method: 'POST',
  //       body: formData
  //     });

  //     if (response.ok) {
  //       console.log('Trip added successfully');
  //       // Do something after successful submission
  //     } else {
  //       console.error('Failed to add trip');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', newTrip.title);
    formData.append('userId', id);
    formData.append('country', newTrip.country);
    formData.append('description', newTrip.description);
    formData.append('duration', newTrip.duration);

    newTrip.photos.forEach((photo) => {
      formData.append('photos', photo);
    });

    newTrip.videos.forEach((video) => {
      formData.append('videos', video);
    });

    try {
      const response = await fetch('http://localhost:8080/trips', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log('Trip added successfully');
        const newTrip = await response.json();
        console.log(newTrip);
        addTripToState(newTrip);
        // Do something after successful submission
      } else {
        const errorText = await response.text();
        console.error('Failed to add trip:', errorText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        placeholder="Title"
        onChange={(event) => handleChangeNewTrip(event, 'title')}
        name="title"
        id="title"
      />
      <label htmlFor="country">Country:</label>
      <input
        type="text"
        placeholder="Country"
        onChange={(event) => handleChangeNewTrip(event, 'country')}
        name="country"
        id="country"
      />
      <label htmlFor="description">Description:</label>
      <textarea
        placeholder="Description"
        onChange={(event) => handleChangeNewTrip(event, 'description')}
        name="description"
        id="description"
        rows="4"
      />
      <label htmlFor="duration">Duration:</label>
      <input
        type="text"
        placeholder="Duration"
        onChange={(event) => handleChangeNewTrip(event, 'duration')}
        name="duration"
        id="duration"
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
//לשנות לטקסט בוקס או משהו

