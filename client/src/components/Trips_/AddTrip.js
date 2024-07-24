import React, { useState } from 'react'

const AddTrip = ({ id, addTripToState }) => {

  const [newTrip, setNewTrip] = useState({
    title: "",
    country: "",
    description: "",
    duration: ""
  });

  const handleChangeNewTrip = (value, type) => {
  
    setNewTrip(prevTrip => {
        return {
          ...prevTrip,
          [type]: value
        };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', newTrip.title);
    formData.append('userId', id);
    formData.append('country', newTrip.country);
    formData.append('description', newTrip.description);
    formData.append('duration', newTrip.duration);

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
      } else {
        const errorText = await response.text();
        console.error('Failed to add trip:', errorText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={(e) =>handleSubmit(e)}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        placeholder="Title"
        onChange={(event) => handleChangeNewTrip(event.target.value, 'title')}
        name="title"
        id="title"
      />
      <label htmlFor="country">Country:</label>
      <input
        type="text"
        placeholder="Country"
        onChange={(event) => handleChangeNewTrip(event.target.value, 'country')}
        name="country"
        id="country"
      />
      <label htmlFor="description">Description:</label>
      <textarea
        placeholder="Description"
        onChange={(event) => handleChangeNewTrip(event.target.value, 'description')}
        name="description"
        id="description"
        rows="4"
      />
      <label htmlFor="duration">Duration:</label>
      <input
        type="text"
        placeholder="Duration"
        onChange={(event) => handleChangeNewTrip(event.target.value, 'duration')}
        name="duration"
        id="duration"
      />
      <button type="submit">Add Trip</button>
    </form>
  );
};

export default AddTrip;