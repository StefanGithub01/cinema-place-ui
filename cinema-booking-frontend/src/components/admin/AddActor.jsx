import React, { useState } from 'react';
import { addActor } from '../../services/ActorService';

const AddActor = () => {
  const initialState = {
    firstName: '',
    lastName: '',
    birthDate: '', // Modified to accept birth date
    avatarImageUrl: '', // Changed to camelCase
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addActor(formData);
      console.log('Actor added successfully:', response.data);
      {alert('Actor added successfully')};
      setFormData(initialState);
    } catch (error) {
      console.error('Error adding Actor:', error);
      {alert('Something went wrong...')};
    }
  };

  return (
    <form style={{ marginTop: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleSubmit}>
      <h1 className="text-white"> Add Actor </h1>
      {Object.keys(initialState).map((key) => (
        <div className="form-group" key={key}>
          <label className="text-white">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
          <br/>
          {key === 'birthDate' ? (
            <input
              type="date" // Set input type to "date"
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
              required={key === 'firstName'}
            />
          )}
        </div>
      ))}
      <button type="submit" className="btn btn-primary">Add Actor</button>
    </form>
  );
};

export default AddActor;
