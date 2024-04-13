import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { addMovie, getAllGenres, getAllAgeRatings } from '../../services/MovieService'; // Import the addMovie function from your service file
import { listAllCinemas } from '../../services/CinemaService';
import { listActors } from '../../services/ActorService';

const AddMovie = () => {
  const initialState = {
    title: '',
    backdrop: '',
    director: '',
    genre: '',
    posterImageUrl: '',
    releaseDate: '',
    trailerLink: '',
    description: '',
    duration: '',
    rated: '',
    imdbMovieId: '',
    selectedActors: [], // Initialize an empty array for selected actor IDs
    selectedCinemas: [] // Initialize an empty array for selected cinema IDs
  };

  const [formData, setFormData] = useState(initialState);
  const [cinemas, setCinemas] = useState([]);
  const [actors, setActors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [ageRatings, setAgeRatings] = useState([]);


  useEffect(() => {
    fetchActors();
    fetchCinemas();
    fetchGenres();
    fetchAgeRatings();
  }, []);

  const fetchCinemas = async () => {
    try {
      const response = await listAllCinemas(); // Fetch list of all cinemas
      setCinemas(response.data);
    } catch (error) {
      console.error('Error fetching cinemas:', error);
    }
  };

  const fetchActors = async () => {
    try {
      const response = await listActors();
      setActors(response.data);
    } catch (error) {
      console.error('Error fetching actors:', error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await getAllGenres();
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };
  const fetchAgeRatings = async () => {
    try {
      const response = await getAllAgeRatings();
      setAgeRatings(response.data);
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleActorChange = (e) => {
    const { options } = e.target;
    const selectedActors = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setFormData({ ...formData, selectedActors });
  };
  
  const handleCinemaChange = (e) => {
    const { options } = e.target;
    const selectedCinemas = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setFormData({ ...formData, selectedCinemas });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const movieFormData = {
        movie: {  // Populate the movie object
          title: formData.title,
          backdrop: formData.backdrop,
          director: formData.director,
          genre: formData.genre,
          rated: formData.ageRating,
          description: formData.description,
          duration: formData.duration,
          imdbMovieId: formData.imdbMovieId,
          posterImageUrl: formData.posterImageUrl,
          releaseDate: formData.releaseDate,
          trailerLink: formData.trailerLink
          // Add other movie properties here
        },
        selectedActorIds: formData.selectedActors,
        selectedCinemaIds: formData.selectedCinemas
      };


      //console.log("FormData:", formData);
      console.log("FormMovieDtoData:", movieFormData);

      const response = await addMovie(movieFormData); // Use the addMovie function to add the movie
      console.log('Movie added successfully:', response.data);
      {alert('Movie added successfully')};
      setFormData(initialState); // Reset form data after submission
    } catch (error) {
      console.error('Error adding movie:', error);
      {alert('Something went wrong...')};

      // Handle error response
    }
  };

  return (
    <form style={{ marginTop: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleSubmit}>
      <h1 className="text-white"> Add Movie </h1>
      {/* Add input fields for other movie details */}
      <div className="form-group">
        <label className="text-white">Select Actors:</label>
        <select name="selectedActors" multiple value={formData.selectedActors} onChange={handleActorChange} required style={{ width: '100%' }} >

          {actors.map((actor) => (
            <option key={actor.actorId} value={actor.actorId}>{actor.firstName} {actor.lastName}</option>
          ))}

        </select>
      </div>
      <div className="form-group">
        <label className="text-white">Select Cinemas:</label>
        <select name="selectedCinemas" multiple value={formData.selectedCinemas} onChange={handleCinemaChange} required style={{ width: '100%' }}>
          {cinemas.map((cinema) => (
            <option key={cinema.cinemaId} value={cinema.cinemaId}>{cinema.name}</option>
          ))}
        </select>

      </div>

      <div className="form-group">
        <label className="text-white">Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label className="text-white">Backdrop URL:</label>
        <input type="text" name="backdrop" value={formData.backdrop} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label className="text-white">Director:</label>
        <input type="text" name="director" value={formData.director} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label className="text-white">Genre:</label>
        <select name="genre" value={formData.genre} onChange={handleChange} required>
          {genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
  <label className="text-white">Poster Image URL:</label>
  <input type="text" name="posterImageUrl" value={formData.posterImageUrl} onChange={handleChange} required />
</div>

<div className="form-group">
  <label className="text-white">Release Date:</label>
  <input type="date" name="releaseDate" value={formData.releaseDate} onChange={handleChange} required />
</div>

<div className="form-group">
  <label className="text-white">Trailer Link:</label>
  <input type="text" name="trailerLink" value={formData.trailerLink} onChange={handleChange} required />
</div>

<div className="form-group">
        <label className="text-white">Rated:</label>
        <select name="ageRating" value={formData.ageRating} onChange={handleChange} required>
          {ageRatings.map((ageRating) => (
            <option key={ageRating} value={ageRating}>{ageRating}</option>
          ))}
        </select>
      </div>

<div className="form-group">
  <label className="text-white">Description:</label>
  <input type="text" name="description" value={formData.description} onChange={handleChange} required />
</div>

<div className="form-group">
  <label className="text-white">Duration:</label>
  <input type="text" name="duration" value={formData.duration} onChange={handleChange} required />
</div>

<div className="form-group">
  <label className="text-white">IMDb Movie ID:</label>
  <input type="text" name="imdbMovieId" value={formData.imdbMovieId} onChange={handleChange} required />
</div>

      <button type="submit" className="btn btn-primary">Add Movie</button>
    </form>
  );
};

export default AddMovie;
