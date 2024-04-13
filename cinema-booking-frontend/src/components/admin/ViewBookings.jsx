import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { listAllBookings } from '../../services/BookingService';
import '../css/AdminPanel.css';

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await listAllBookings();
      setBookings(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-d-flex p-flex-column p-ai-center">
      <h2 className="text-white" style={{textAlign: 'center'}}>View Bookings</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="p-datatable-custom">
        <DataTable value={bookings} sortMode="multiple" className="p-datatable-striped">
          <Column field="bookingId" header="ID" className="text-white" sortable style={{ width: '10%' }} />
          <Column field="user.username" header="User" className="text-white" sortable style={{ width: '20%' }} />
          <Column field="showtime.movie.title" header="Movie" className="text-white" sortable style={{ width: '30%' }} />
          <Column field="showtime.startTime" header="Start Time" className="text-white" sortable style={{ width: '20%' }} />
          <Column field="date" header="Booking Date" className="text-white" sortable style={{ width: '20%' }} />
          <Column field="bookedSeats" header="Booked Seats" className="text-white" />
          <Column field="price" header="Price" className="text-white" sortable style={{ width: '15%' }} />
        </DataTable>
      </div>
    </div>
  );
};

export default ViewBookings;
