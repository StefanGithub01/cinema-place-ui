import React, { useState } from 'react';
import AddMovieForm from './AddMovie'; // Import the AddMovieForm component
import AddShowtimeForm from './AddShowtime'; // Import the AddShowtimeForm component
import AddActorForm from './AddActor';
import AddCinemaForm from './AddCinema';
import EditActorForm from './EditActor';
import EditCinemaForm from './EditCinema';
import EditShowtimeForm from './EditShowtime';
import EditMovieForm from './EditMovie';
import ViewActorForm from './ViewActors';
import ViewMovieForm from './ViewMovies';
import ViewShowtimeForm from './ViewShowtimes';
import ViewCinemaForm from './ViewCinemas';
import ViewBookingForm from './ViewBookings';
import ViewReviewForm from './ViewReviews';
import ViewUserForm from './ViewUsers';
import EditReviewForm from './EditReviews'

import '../SeatSelectionStyle.css';
import "../css/AdminPanel.css"; // Import your CSS file

const AdminPanel = () => {
  const [selectedOption, setSelectedOption] = useState(''); // State to track which option is selected

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <br/><br/><br/>
      <h1 className='text-white' style={{textAlign: 'center'}}>Admin Panel</h1>
      {/* Buttons or links to select the task */}
      <div className="button-container">
        <button className='buttonAdmin' onClick={() => handleOptionSelect('viewMovie')}>View Movies</button>
        <button className='buttonAdmin' onClick={() => handleOptionSelect('viewShowtime')}>View Showtimes</button>
        <button className='buttonAdmin' onClick={() => handleOptionSelect('viewActor')}>View Actors</button>
        <button className='buttonAdmin' onClick={() => handleOptionSelect('viewCinema')}>View Cinemas</button>
        <button className='buttonAdmin' onClick={() => handleOptionSelect('viewBooking')}>View Bookings</button>
        <button className='buttonAdmin' onClick={() => handleOptionSelect('viewReview')}>View Reviews</button>
        <button className='buttonAdmin' onClick={() => handleOptionSelect('viewUser')}>View Users</button>
      </div>
      <div className="button-container">
        <button className="buttonAdmin" onClick={() => handleOptionSelect('addMovie')}>Add Movie</button>
        <button className="buttonAdmin" onClick={() => handleOptionSelect('addShowtime')}>Add Showtime</button>
        <button className="buttonAdmin" onClick={() => handleOptionSelect('addActor')}>Add Actor</button>
        <button className="buttonAdmin" onClick={() => handleOptionSelect('addCinema')}>Add Cinema</button>
      </div>
      {/*
      <button onClick={() => handleOptionSelect('editMovie')}>Edit Movie</button>
      <button onClick={() => handleOptionSelect('editShowtime')}>Edit Showtime</button>
      <button onClick={() => handleOptionSelect('editActor')}>Edit Actor</button>
      <button onClick={() => handleOptionSelect('editCinema')}>Edit Cinema</button>
      <br/><br/>
      <button onClick={() => handleOptionSelect('deleteActor')}>Delete Actor</button>
      */}

      {/* Conditional rendering of the form based on the selected option */}
      {selectedOption === 'viewMovie' && <ViewMovieForm />}
      {selectedOption === 'viewShowtime' && <ViewShowtimeForm />}
      {selectedOption === 'viewActor' && <ViewActorForm />}
      {selectedOption === 'viewCinema' && <ViewCinemaForm />}
      {selectedOption === 'viewBooking' && <ViewBookingForm />}
      {selectedOption === 'viewReview' && <ViewReviewForm />}
      {selectedOption === 'viewUser' && <ViewUserForm />}

      {selectedOption === 'addMovie' && <AddMovieForm />}
      {selectedOption === 'addShowtime' && <AddShowtimeForm />}
      {selectedOption === 'addActor' && <AddActorForm />}
      {selectedOption === 'addCinema' && <AddCinemaForm />}
      {selectedOption === 'editActor' && <EditActorForm />}
      {selectedOption === 'editCinema' && <EditCinemaForm />}
      {selectedOption === 'editShowtime' && <EditShowtimeForm />}
      {selectedOption === 'editMovie' && <EditMovieForm />}
      {selectedOption === 'deleteActor' && <DeleteActorForm />}
    </div>
  );
};

export default AdminPanel;
