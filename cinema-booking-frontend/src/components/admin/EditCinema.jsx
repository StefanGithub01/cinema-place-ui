import React, { useState, useEffect } from 'react';
import { updateCinema } from '../../services/CinemaService';

const EditCinemaForm = ({ cinema, cancelEdit, onCinemaUpdated }) => {
  const [updatedCinema, setUpdatedCinema] = useState(cinema);

  useEffect(() => {
    setUpdatedCinema(cinema);
  }, [cinema]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCinema(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateCinema(updatedCinema);
      console.log('Cinema updated successfully:', response.data);
      alert('Cinema updated successfully');
      onCinemaUpdated();
      cancelEdit();
    } catch (error) {
      console.error('Error updating Cinema:', error);
      alert('Something went wrong...');
    }
  };

  return (
    <form style={{ marginTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleSubmit}>
      <h1 className="text-white"> Edit Cinema: </h1>
      <div className="form-group">
        <label className="text-white">Name:</label>
        <input
          type="text"
          name="name"
          value={updatedCinema.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="text-white">Location:</label>
        <input
          type="text"
          name="location"
          value={updatedCinema.location}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="text-white">Capacity:</label>
        <input
          type="number"
          name="capacity"
          value={updatedCinema.capacity}
          onChange={handleChange}
        />
      </div>
      <input type="hidden" name="cinemaId" value={updatedCinema.cinemaId} />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button className='buttonAdmin' type="submit">Submit</button>
        <button className= "cancel-buttonAdmin" onClick={cancelEdit}>Cancel</button> {/* Button to cancel editing */}
      </div>
    </form>
  );
};

export default EditCinemaForm;