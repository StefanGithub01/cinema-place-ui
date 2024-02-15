import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SeatSelectionStyle.css';
import { createBooking } from '../services/BookingService';
import { useAuth } from './header/AuthContext';
import { useNavigate } from 'react-router-dom';

const SeatSelectionComponent = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { state } = location;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showtime, setShowtime] = useState(null);
  const [bookingResponse, setBookingResponse] = useState(null);
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
    createBooking(user.userId, showtime.showtimeId, selectedSeats, new Date())
      .then(response => {
        setBookingResponse(response.data);
        alert("Booking was successful!")
        navigator(`/bookings/${user.userId}`, { state: { userId: user.userId } });
        // Handle additional actions if needed
      })
      .catch(error => {
        console.error('Error creating booking:', error);
        alert("Something went wrong.")
        // Handle error accordingly
      });
  };

  return (
    <div className="seat-selection-container">
      {showtime && (
        <>
        <br/><br/><br/>
          <h2 className='white'>Seat Selection for {showtime.movie.title}</h2>
          <p className='white'>Showtime: {formatTime(showtime.startTime)} - {formatTime(showtime.endTime)}</p>
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
                {isSeatAvailable ? 'A' : 'X'}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="buy-tickets-button" onClick={handleBuyTickets}>
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
