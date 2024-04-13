import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { addShowtime } from '../../services/ShowtimeService'; // Import the addShowtime function from your service file
import { listMovies } from '../../services/MovieService';
import { listAllCinemas } from '../../services/CinemaService';

const AddShowtime = () => {
  const [formData, setFormData] = useState({
    movieId: '',
    startTime: '',
    endTime: '',
    cinemaId: '',
    seatGrid: generateSeatGrid(10, 10) // Initial seat grid with 10 rows and 10 columns
  });
  const [movies, setMovies] = useState([]);
  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    // Fetch the list of movies and cinemas when the component mounts
    fetchMovies();
    fetchCinemas();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await listMovies(); // Adjust the endpoint accordingly
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchCinemas = async () => {
    try {
      const response = await listAllCinemas(); // Adjust the endpoint accordingly
      setCinemas(response.data);
    } catch (error) {
      console.error('Error fetching cinemas:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Selected ${name}: ${value}`); // Log selected movie or cinema
    setFormData({ ...formData, [name]: value });
  };

  const handleGridChange = (rowIndex, seatIndex) => {
    const newSeatGrid = [...formData.seatGrid];
    newSeatGrid[rowIndex][seatIndex] = !newSeatGrid[rowIndex][seatIndex];
    setFormData({ ...formData, seatGrid: newSeatGrid });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("FormData:", formData);
      const response = await addShowtime(formData); // Use the addShowtime function to add the showtime
      {alert('Showtime Added!')};

      console.log('Showtime added successfully:', response.data);
      // Optionally, reset the form after successful submission
      setFormData({
        movieId: '',
        startTime: '',
        endTime: '',
        cinemaId: '',
        seatGrid: generateSeatGrid(10, 10) // Reset seat grid to 10x10
      });
    } catch (error) {
      console.error('Error adding showtime:', error);
      {alert('Something went wrong!')};

      // Handle error response
    }
  };

  return (
    <form style={{marginTop: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center'}} onSubmit={handleSubmit}>
      <div className="form-group">
      <h1 className="text-white"> Add Showtime </h1>
        <label className="text-white">Select Movie:</label>
        <select name="movieId" value={formData.movieId} onChange={handleChange} required>
          <option value="">Select a movie</option>
          {movies.map((movie) => (
            <option key={movie.movieId} value={movie.movieId}>{movie.title}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-white">Select Cinema:</label>
        <select name="cinemaId" value={formData.cinemaId} onChange={handleChange} required>
          <option value="">Select a cinema</option>
          {cinemas.map((cinema) => (
            <option key={cinema.cinemaId} value={cinema.cinemaId}>{cinema.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-white">Start Time:</label>
        <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label className="text-white">End Time:</label>
        <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label className="text-white">Seat Grid:</label>
        <table>
          <tbody>
            {formData.seatGrid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((seat, seatIndex) => (
                  <td key={seatIndex}>
                    <input
                      type="checkbox"
                      checked={seat}
                      onChange={() => handleGridChange(rowIndex, seatIndex)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button type="submit" className="btn btn-primary">Add Showtime</button>
    </form>
  );
};

const generateSeatGrid = (rows, cols) => {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => true));
};

export default AddShowtime;
