import React, { useState, useEffect } from 'react';
import { getAllAgeRatings, getAllGenres, listMovies, updateMovie } from '../../services/MovieService';
import { listActors } from '../../services/ActorService';
import { listAllCinemas } from '../../services/CinemaService';
import { useNavigate } from 'react-router-dom';

const EditMovieForm = ({ movie: selectedMovie, movieId, cancelEdit, onMovieUpdated }) => {
  const navigator = useNavigate();

  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(movieId); // Initialize selectedMovieId with the movieId prop
  const [movie, setMovie] = useState({
    movieId:'',
    title: '',
    releaseDate: '',
    director: '',
    genre: '',
    backdrop: '',
    posterImageUrl: '',
    trailerLink: '',
    rated: '',
    description: '',
    duration: '',
    imdbMovieId: '',
    actors: [],
    selectedActors: [], // Initialize an empty array for selected actor IDs
    selectedCinemas: [] // Initialize an empty array for selected cinema IDs
  });
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [ageRatings, setAgeRatings] = useState([]);
  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    fetchMovies();
    fetchActors();
    fetchCinemas();
    fetchGenres();
    fetchAgeRatings();
  }, []);

  useEffect(() => {
    if (selectedMovie) {
      // Set the selected movie data to the form fields
      setMovie({
        ...selectedMovie,
        selectedActors: selectedMovie.actors.map(actor => actor.actorId),
        selectedCinemas: selectedMovie.cinemas.map(cinema => cinema.cinemaId)
      });
      setSelectedMovieId(selectedMovie.movieId); // Set the selected movie ID in the select bar
    }
  }, [selectedMovie]);

  const fetchMovies = async () => {
    try {
      const response = await listMovies();
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchCinemas = async () => {
    try {
      const response = await listAllCinemas();
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

  const fetchAgeRatings = async () => {
    try {
      const response = await getAllAgeRatings();
      setAgeRatings(response.data);
    } catch (error) {
      console.error('Error fetching ratings:', error);
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

  const generateMovieFormData = (formData) => {
    const movieFormData = {
      movie: {
        movieId: formData.movieId,
        title: formData.title,
        backdrop: formData.backdrop,
        director: formData.director,
        genre: formData.genre,
        rated: formData.rated,
        description: formData.description,
        duration: formData.duration,
        imdbMovieId: formData.imdbMovieId,
        posterImageUrl: formData.posterImageUrl,
        releaseDate: formData.releaseDate,
        trailerLink: formData.trailerLink,
        // Add other movie properties here
      },
      selectedActorIds: formData.selectedActors,
      selectedCinemaIds: formData.selectedCinemas
    };
  
    return movieFormData;
  };

  const handleMovieChange = (e) => {
    const movieId = parseInt(e.target.value);
    setSelectedMovieId(movieId);
    const selectedMovie = movies.find(movie => movie.movieId === movieId);
    if (selectedMovie) {
      // Initialize actors with the actor IDs from the selected movie
      const actorIds = selectedMovie.actors.map(actor => actor.actorId);
      // Initialize cinemas with the cinema IDs from the selected movie
      const cinemaIds = selectedMovie.cinemas.map(cinema => cinema.cinemaId);
      setMovie({ ...selectedMovie, selectedActors: actorIds, selectedCinemas: cinemaIds});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleActorChange = (e, actorId) => {
    const { checked } = e.target;
    console.log('Actor ID:', actorId); // Add this console log
    console.log('Checked:', checked); // Add this console log
    setMovie(prevState => {
      const updatedActors = checked
        ? [...prevState.selectedActors, actorId]
        : prevState.selectedActors.filter(id => id !== actorId);
      console.log('Updated Actors:', updatedActors); // Add this console log
      return { ...prevState, selectedActors: updatedActors };
    });
  };

  const handleCinemaChange = (e, cinemaId) => {
    const { checked } = e.target;
    console.log('Cinema ID:', cinemaId); // Add this console log
    console.log('Checked:', checked); // Add this console log
    setMovie(prevState => {
      const updatedCinemas = checked
        ? [...prevState.selectedCinemas, cinemaId]
        : prevState.selectedCinemas.filter(id => id !== cinemaId);
      console.log('Updated Cinemas:', updatedCinemas); // Add this console log
      return { ...prevState, selectedCinemas: updatedCinemas };
    });
  };

  // Submit Data to the Backend

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const movieFormData = generateMovieFormData(movie);
    console.log('Data sent :', movieFormData);

    const response = await updateMovie(movieFormData);
    console.log('Movie updated successfully:', response.data);
    alert('Movie updated successfully');
    onMovieUpdated(); // Call the callback function to notify the parent component
    cancelEdit();
    navigator("/user/admin");

    
  } catch (error) {
    console.error('Error updating Movie:', error);
    alert('Something went wrong...');
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-white">Edit Movie</h1>
      <div className="form-group">
        <label className="text-white">Select Movie:</label>
        <select value={selectedMovieId} onChange={handleMovieChange}>
          <option value="">Select Movie</option>
          {movies.map(movie => (
            <option key={movie.movieId} value={movie.movieId}>{movie.title}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-white">Title:</label>
        <input
          type="text"
          name="title"
          value={movie.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="text-white">Release Date:</label>
        <input
          type="date"
          name="releaseDate"
          value={movie.releaseDate}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="text-white">Director:</label>
        <input
          type="text"
          name="director"
          value={movie.director}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="text-white">Genre:</label>
        <select name="genre" value={movie.genre} onChange={handleChange}>
          <option value="">Select Genre</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
      <label className="text-white">Rated:</label>
      <select name="rated" value={movie.rated} onChange={handleChange}>
          <option value="">Select Rating</option>
          {ageRatings.map(ageRating => (
            <option key={ageRating} value={ageRating}>{ageRating}</option>
          ))}
      </select>
    </div>

      <div className="form-group">
        <label className="text-white">Backdrop:</label>
        <input
          type="text"
          name="backdrop"
          value={movie.backdrop}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="text-white">Poster Image URL:</label>
        <input
          type="text"
          name="posterImageUrl"
          value={movie.posterImageUrl}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="text-white">Trailer Link:</label>
        <input
          type="text"
          name="trailerLink"
          value={movie.trailerLink}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="text-white">Description:</label>
        <textarea
          name="description"
          value={movie.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="form-group">
        <label className="text-white">Duration: (ex: PT0H0M)</label>
        <input
          type="text"
          name="duration"
          value={movie.duration}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="text-white">IMDB Movie ID:</label>
        <input
          type="text"
          name="imdbMovieId"
          value={movie.imdbMovieId}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
  <label className="text-white">Cinemas:</label>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    {cinemas.map(cinema => (
      <div key={cinema.cinemaId} style={{ marginRight: '20px' }}>
        <input
          type="checkbox"
          id={`cinema-${cinema.cinemaId}`}
          value={cinema.cinemaId}
          checked={movie.selectedCinemas.includes(cinema.cinemaId)}
          onChange={(e) => handleCinemaChange(e, cinema.cinemaId)}
          style={{ marginRight: '5px' }}
        />
        <label className="text-white" htmlFor={`cinema-${cinema.cinemaId}`}>{cinema.name}</label>
      </div>
    ))}
  </div>
</div>

<div className="form-group">
  <label className="text-white">Actors:</label>
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {actors.map(actor => (
      <div key={actor.actorId} style={{ marginRight: '20px', marginBottom: '10px' }}>
        <input
          type="checkbox"
          id={`actor-${actor.actorId}`}
          value={actor.actorId}
          checked={movie.selectedActors.includes(actor.actorId)}
          onChange={(e) => handleActorChange(e, actor.actorId)}
          style={{ marginRight: '5px' }}
        />
        <label className="text-white" htmlFor={`actor-${actor.actorId}`}>{actor.firstName} {actor.lastName}</label>
      </div>
    ))}
  </div>
</div>

    <input type="hidden" name="movieId" value={movie.movieId} />

      <button className='buttonAdmin' type="submit">Submit</button>
      <button className="cancel-buttonAdmin" onClick={cancelEdit}>Cancel</button> {/* Button to cancel editing */}

    </form>
  );
};

export default EditMovieForm;