import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SeatSelectionStyle.css';
import { createBooking } from '../services/BookingService';
import { useAuth } from './header/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa'; // Import the spinner icon from react-icons/fa
import TvIcon from '@mui/icons-material/Tv';

const SeatSelectionComponent = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { state } = location;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showtime, setShowtime] = useState(null);
  const [bookingResponse, setBookingResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    if (state && state.showtime) {
      setShowtime(state.showtime);
    }
  }, [state]);

  const handleSeatClick = (rowIndex, seatIndex) => {
    const seatKey = `${rowIndex}-${seatIndex}`;
    setSelectedSeats(prevSelectedSeats =>
      prevSelectedSeats.includes(seatKey)
        ? prevSelectedSeats.filter(seat => seat !== seatKey)
        : [...prevSelectedSeats, seatKey]
    );
  };

  const handleBuyTickets = () => {
    setLoading(true);
    const ticketPrice = 10; // Example price, you can adjust this value or get it from somewhere else
    createBooking(user.userId, showtime.showtimeId, selectedSeats, new Date(), ticketPrice)
      .then(response => {
        setBookingResponse(response.data);
        alert("Booking was successful!")
        navigator(`/bookings/${user.userId}`, { state: { userId: user.userId } });
      })
      .catch(error => {
        console.error('Error creating booking:', error);
        alert("Something went wrong.")
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="seat-selection-container">
      {loading && ( // Display the loading indicator when loading is true
        <div className="loading-indicator">
          <FaSpinner className="spinner-icon rotating" /> {/* Use FaSpinner component from react-icons */}
          <p className="loading-text">Loading, please wait...</p>
        </div>
      )}
      {showtime && (
        <>
          <br/><br/><br/>
          <h2 className='white'>Seat Selection for {showtime.movie.title}, at {showtime.cinema.name} - {showtime.cinema.location}</h2>
          <p className='white'>Showtime: {formatTime(showtime.startTime)} - {formatTime(showtime.endTime)}</p>
          <TvIcon style={{ fontSize: '150px', color: 'white'}} /> {/* TV icon */}
          <br/>
          <br/>
        </>
      )}
      <div className="seat-grid">
        {showtime && (
          <div className="seat-row">
            <div className="seat light-blue">-</div> {/* Empty space for column numbering */}
            {showtime.seatGrid[0].map((_, seatIndex) => (
              <div key={seatIndex} className="seat light-blue">{seatIndex}</div>
            ))}
          </div>
        )}
        {showtime && showtime.seatGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            <div className="seat light-blue">{rowIndex}</div> {/* Row number */}
            {row.map((isSeatAvailable, seatIndex) => (
              <div
                key={seatIndex}
                className={`seat ${isSeatAvailable ? 'available' : 'unavailable'} ${
                  selectedSeats.includes(`${rowIndex}-${seatIndex}`) ? 'selected' : ''
                }`}
                onClick={() => isSeatAvailable && handleSeatClick(rowIndex, seatIndex)}
              >
                {/* Render seat number based on row and seatIndex */}
                {isSeatAvailable ? `${seatIndex}` : 'X'}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button 
      className="buy-tickets-button" 
      onClick={handleBuyTickets} 
      disabled={loading || selectedSeats.length === 0} // Disable button when no seats are selected
      >
      Buy Tickets
      </button>

      {bookingResponse && (
        <div className="booking-response">
          <p>Booking created successfully!</p>
          <p>Booking ID: {bookingResponse.bookingId}</p>
          <p>Booked Seats: {bookingResponse.bookedSeats}</p>
        </div>
      )}
    </div>
  );
};

const formatTime = (timeString) => {
  return new Date(timeString).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default SeatSelectionComponent;
