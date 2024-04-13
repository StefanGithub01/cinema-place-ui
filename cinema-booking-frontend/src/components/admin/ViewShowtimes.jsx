import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { listAllShowtimes } from '../../services/ShowtimeService';
import '../css/AdminPanel.css';
import '../SeatSelectionStyle.css';
import { Button } from 'primereact/button';
import EditShowtimeForm from './EditShowtime';

const ViewShowtimes = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  useEffect(() => {
    fetchShowtimes();
  }, []);

  const fetchShowtimes = async () => {
    try {
      setLoading(true);
      const response = await listAllShowtimes();
      setShowtimes(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const cinemasTemplate = (rowData) => {
    return rowData.cinema ? rowData.cinema.name : '';
  };

  const movieTitleTemplate = (rowData) => {
    return rowData.movie ? rowData.movie.title : '';
  };

  const startTimeTemplate = (rowData) => {
    return new Date(rowData.startTime).toLocaleString();
  };

  const endTimeTemplate = (rowData) => {
    return new Date(rowData.endTime).toLocaleString();
  };

  const seatGridTemplate = (rowData) => {
    return rowData.seatGrid ? (
      <div className="seat-grid">
        {rowData.seatGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            <table>
              <tbody>
                <tr>
                  {row.map((seat, idx) => (
                    <td key={idx}>
                        <span className={`seat ${seat ? 'available' : 'taken' } viewshowtimes-seat`}></span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    ) : '';
  };

  const editButtonTemplate = (rowData) => {
    return (
      <Button label="Edit" className="p-button-primary buttonAdmin" onClick={() => handleEdit(rowData)} />
    );
  };

  const handleEdit = (rowData) => {
    setSelectedShowtime(rowData);
    console.log("selectedShowtime", rowData );
    console.log("movieId", rowData.movie.movieId );

  };

  const cancelEdit = () => {
    setSelectedShowtime(null);
  };

  return (
    <div className="p-d-flex p-flex-column p-ai-center">
      <h2 className="text-white" style={{textAlign: 'center'}}>View Showtimes</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!selectedShowtime ? (
        <div className="p-datatable-custom">
          <DataTable value={showtimes} sortMode="multiple" className="p-datatable-striped">
            <Column field="showtimeId" header="ID" className="text-white" sortable style={{ width: '10%' }} />
            <Column field="cinema" header="Cinema" body={cinemasTemplate} className="text-white" sortable style={{ width: '20%' }} />
            <Column field="movie" header="Movie" body={movieTitleTemplate} className="text-white" sortable style={{ width: '30%' }} />
            <Column field="startTime" header="Start Time" body={startTimeTemplate} className="text-white" sortable style={{ width: '20%' }} />
            <Column field="endTime" header="End Time" body={endTimeTemplate} className="text-white" sortable style={{ width: '20%' }} />
            <Column field="seatGrid" header="Seat Grid" body={seatGridTemplate} className="text-white" />
            <Column header="Actions" body={editButtonTemplate} style={{ textAlign: 'center', width: '10%' }} />
          </DataTable>
        </div>
      ) : (
        <EditShowtimeForm showtime = {selectedShowtime} showtimeId = {selectedShowtime.showtimeId} movieId ={selectedShowtime.movie.movieId} cancelEdit={cancelEdit}/>
      )}
    </div>
  );
};

export default ViewShowtimes;
