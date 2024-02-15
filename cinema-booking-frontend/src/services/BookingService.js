import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/bookings';

// Function to create a new booking
export const createBooking = (userId, showtimeId, selectedSeats, date) => {
  const requestData = { userId, showtimeId, selectedSeats, date };
  console.log('Request Data:', requestData); // Log the request data
  return axios.post(REST_API_BASE_URL, requestData);
};

export const listBookingsForUserId = (userId) => axios.get(`${REST_API_BASE_URL}/${userId}`);

// Function to cancel a booking by its ID
export const cancelBooking = (bookingId) => axios.delete(`${REST_API_BASE_URL}/${bookingId}`);