import React, { useState } from 'react';
import { addCinema } from '../../services/CinemaService';

const AddCinema = () => {
  const initialState = {
    name: '',
    location: '',
    capacity: '', 
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addCinema(formData);
      console.log('Cinema added successfully:', response.data);
      {alert('Cinema added successfully!')};

      setFormData(initialState);
    } catch (error) {
      {alert('Something went wrong...')};
      console.error('Error adding Cinema:', error);
    }
  };

  return (
    <form style={{ marginTop: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleSubmit}>
      <h1 className="text-white"> Add Cinema </h1>
      {Object.keys(initialState).map((key) => (
        <div className="form-group" key={key}>
          <label className="text-white">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
          <br/>
          {key === 'int' ? (
            <input
              type="number" 
              name={key}
              value={formData[key]}
              onChange={handleChange}
              style={{ width: '300px' }}
              required
            />
          ) : (
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              style={{ width: '300px' }}
              required={key === 'name'}
            />
          )}
        </div>
      ))}
      <button type="submit" className="btn btn-primary">Add Cinema</button>
    </form>
  );
};

export default AddCinema;
