import React, { useState, useEffect } from 'react';
import { updateShowtime, listAllShowtimes } from '../../services/ShowtimeService';

const generateSeatGrid = (rows, cols) => {
    return Array.from({ length: rows }, () => Array.from({ length: cols }, () => true));
};

const EditShowtimeForm = ({ showtime, showtimeId, movieId, cancelEdit}) => {
  const [showtimes, setShowtimes] = useState([]);
  const [selectedShowtimeId, setSelectedShowtimeId] = useState(showtimeId);
  const [initialShowtime, setInitialShowtime] = useState({
    movieId: '',
    showtimeId: '',
    startTime: '',
    endTime: '',
    cinemaId: '',
    seatGrid: generateSeatGrid(10, 10)
  });

  useEffect(() => {
    fetchAllShowtimes();
  }, []);

  useEffect(() => {
    if (showtime) {
      setInitialShowtime(prevState => ({
        ...prevState,
        movieId: movieId || '',
        cinemaId: showtime.cinema.cinemaId || '',
        ...showtime
      }));
    }
  }, [showtime]);

  const fetchAllShowtimes = async () => {
    try {
      const response = await listAllShowtimes();
      setShowtimes(response.data);
    } catch (error) {
      console.error('Error fetching showtimes:', error);
    }
  };

  const handleShowtimeChange = (e) => {
    const showtimeId = parseInt(e.target.value);
    setSelectedShowtimeId(showtimeId);
    const selectedShowtime = showtimes.find(showtime => showtime.showtimeId === showtimeId);
    if (selectedShowtime) {
      const { movieId, cinemaId, ...rest } = selectedShowtime;
      setInitialShowtime(prevState => ({
        ...prevState,
        movieId: movieId || '',
        cinemaId: cinemaId || '',
        ...rest
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitialShowtime(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSeatChange = (rowIndex, colIndex) => {
    const newSeatGrid = [...initialShowtime.seatGrid];
    newSeatGrid[rowIndex][colIndex] = !newSeatGrid[rowIndex][colIndex];
    setInitialShowtime(prevState => ({
      ...prevState,
      seatGrid: newSeatGrid
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Showtime Sent is:", initialShowtime);
      console.log("Movie Id is", initialShowtime.movieId);
      console.log("Cinema Id is", initialShowtime.cinemaId);
      console.log("Showtime Id is", initialShowtime.showtimeId);
      console.log("Startime is", initialShowtime.startTime);
      console.log("EndTime is", initialShowtime.endTime);
      console.log("Seatgrid is", initialShowtime.seatGrid);

      const response = await updateShowtime(initialShowtime);
      console.log('Showtime updated successfully:', response.data);
      alert('Showtime updated successfully');
      cancelEdit();
    } catch (error) {
      console.error('Error updating Showtime:', error);
      alert('Something went wrong...');
    }
  };

  return (
    <form style={{ marginTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleSubmit}>
      <h1 className="text-white">Edit Showtime</h1>
      <div>
        <label className="text-white">Select Showtime:</label>
        <select value={selectedShowtimeId} onChange={handleShowtimeChange}>
          <option value="">Select Showtime</option>
          {showtimes.map(showtime => (
            <option key={showtime.showtimeId} value={showtime.showtimeId}>
              {`${showtime.startTime} - ${showtime.endTime} (${showtime.movie ? showtime.movie.title : 'Unknown Movie'}) - ${showtime.cinema ? showtime.cinema.name : 'Unknown Cinema'}`}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-white">Start Time:</label>
        <input
          type="datetime-local"
          name="startTime"
          value={initialShowtime.startTime}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="text-white">End Time:</label>
        <input
          type="datetime-local"
          name="endTime"
          value={initialShowtime.endTime}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="text-white">Seat Grid:</label>
        <table>
          <tbody>
            {initialShowtime.seatGrid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((seat, colIndex) => (
                  <td key={colIndex} style={{ backgroundColor: seat ? 'green' : 'red' }}>
                    <input
                      type="checkbox"
                      checked={seat}
                      onChange={() => handleSeatChange(rowIndex, colIndex)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <input type="hidden" name="movieId" value={initialShowtime.movieId} />
      <input type="hidden" name="cinemaId" value={initialShowtime.cinemaId} />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button className="buttonAdmin" type="submit">Submit</button>
        <button className="cancel-buttonAdmin" onClick={cancelEdit} style={{ marginLeft: '10px' }}>Cancel</button>
      </div>
    </form>
  );
};

export default EditShowtimeForm;
