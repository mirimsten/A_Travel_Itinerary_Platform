import React, {useState} from 'react'

const AddTrip = () => {

  const [newTrip, setNewTrip] = useState({
    title: "",
    country: "",
    description: ""
  })

  const handleChangeNewTrip = (event, type) => {
    setNewTrip({
      ...newTrip,
      [type]: event.target.value
    })
  }

  return (
    <div>
      <label htmlFor="tytle">title:</label>
      <input
        type="text"
        placeholder="title"
        onChange={(event) => handleChangeNewTrip(event, 'title')}
        name="title"
        id="title"
      />
      <label htmlFor="country">country:</label>
      <input
        type="text"
        placeholder="country"
        onChange={(event) => handleChangeNewTrip(event, 'country')}
        name="country"
        id="country"
      />
      <label htmlFor="description">description:</label>
      <input
        type="text"
        placeholder="description"
        onChange={(event) => handleChangeNewTrip(event, 'description')}
        name="description"
        id="description"
      />
    </div>
  );
}

export default AddTrip
//לשנות לטקסט בוקס או משהו