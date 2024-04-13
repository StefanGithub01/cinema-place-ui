import React, { useEffect, useState } from 'react';
import { listBookingsForUserId, cancelBooking } from '../services/BookingService';
import { useAuth } from './header/AuthContext';
import './css/Bookings_Style.css'; // Import your CSS file

const ListBookingsForUserComponent = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    listBookingsForUserId(user.userId)
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [user.userId]);

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to format the time range including date
  const formatTimeRange = (startTimeString, endTimeString) => {
    const startDate = new Date(startTimeString);
    const endDate = new Date(endTimeString);
    const startTime = `${startDate.getHours()}:00`;
    const endTime = `${endDate.getHours()}:00`;
    const date = formatDate(startDate);
    return `${date} ${startTime} - ${endTime}`;
  };

  // Function to handle cancellation of a booking
  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      // Update the bookings list after cancellation
      const updatedBookings = bookings.filter(booking => booking.bookingId !== bookingId);
      setBookings(updatedBookings);
      alert("Booking Canceled Succesfully!")
    } catch (error) {
      console.error('Error canceling booking:', error);
      alert("Something went wrong...")
    }
  };

  // Initialize variable to track booking number
  let bookingNumber = 1;

  return (
    <div className='container'>
      <h2 className='title'>List of Bookings:</h2>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Nr</th>
            <th>Movie</th>
            <th>Showtime</th>
            <th>Cinema</th>
            <th>Booked Seat</th> {/* Change header */}
            <th>Booking Date</th>
            <th>Cancel Booking</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.bookingId}>
              <td>{bookingNumber++}</td>
              <td>
                <div>
                  <img src={booking.showtime.movie.posterImageUrl} alt={booking.showtime.movie.title} style={{ width: '100px' }} />
                  <p>{booking.showtime.movie.title}</p>
                </div>
              </td>
              <td>{formatTimeRange(booking.showtime.startTime, booking.showtime.endTime)}</td>
              <td><p>{booking.showtime.cinema.name} - {booking.showtime.cinema.location}</p></td>
              <td>{booking.bookedSeats.split(',').map(seat => `Row ${seat.split('-')[0]} Seat ${seat.split('-')[1]}`).join(', ')}</td> {/* Change logic */}
              <td>{formatDate(booking.date)}</td>
              <td>
                <button className="cancel-button" onClick={() => handleCancelBooking(booking.bookingId)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListBookingsForUserComponent;
