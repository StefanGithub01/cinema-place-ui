import React, { useState, useEffect } from 'react';
import { listActors, updateActor } from '../../services/ActorService';

const EditActorForm = ({ actor, cancelEdit, onActorUpdated }) => {
  const [updatedActor, setUpdatedActor] = useState(actor);

  useEffect(() => {
    setUpdatedActor(actor);
  }, [actor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedActor(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateActor(updatedActor);
      console.log('Actor updated successfully:', response.data);
      alert('Actor updated successfully');
      onActorUpdated(); // Call the callback function to trigger rerender
      cancelEdit();
    } catch (error) {
      console.error('Error updating Actor:', error);
      alert('Something went wrong...');
    }
  };

  return (
    <form style={{ marginTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleSubmit}>
      <h1 className="text-white"> Edit Actor: </h1>

      <div className="form-group">
        <label className="text-white">First Name:</label>
        <input
          type="text"
          name="firstName"
          value={updatedActor.firstName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="text-white">Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={updatedActor.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="text-white">Birth Date:</label>
        <input
          type="date"
          name="birthDate"
          value={updatedActor.birthDate}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="text-white">Avatar Image URL:</label>
        <input
          type="text"
          name="avatarImageUrl"
          value={updatedActor.avatarImageUrl}
          onChange={handleChange}
        />
      </div>

      <input type="hidden" name="actorId" value={updatedActor.actorId} />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button className='buttonAdmin' type="submit">Submit</button>
        <button className= "cancel-buttonAdmin" onClick={cancelEdit}>Cancel</button> {/* Button to cancel editing */}
      </div>
    </form>
  );
};

export default EditActorForm;
