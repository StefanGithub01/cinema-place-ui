import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/movies/all';
const REST_API_MOVIES_GENRE = 'http://localhost:8080/api/movies/genre'; 
const REST_API_GET_MOVIES_BY_YEAR = 'http://localhost:8080/api/movies/year';
const REST_API_MOVIES_ACTORS = 'http://localhost:8080/api/movies'; 
const REST_API_MOVIE_BY_ID = 'http://localhost:8080/api/movies';
const REST_API_MOVIES_FOR_ACTOR = 'http://localhost:8080/api/movies/actor';
const REST_API_DEFAULT = 'http://localhost:8080/api/movies';

export const listMovies = () => axios.get(REST_API_BASE_URL);

export const listMoviesByGenre = (genre) => axios.get(`${REST_API_MOVIES_GENRE}/${genre}`);
export const listMoviesByYear = (year) => axios.get(`${REST_API_GET_MOVIES_BY_YEAR}/${year}`);
export const listBookingsForUserId = (userId) => axios.get(`${REST_API_BASE_URL}/${userId}`);
export const getActorsForMovie = (movieId) => axios.get(`${REST_API_MOVIES_ACTORS}/${movieId}/actors`);
export const getSingleMovie = (movieId) => axios.get(`${REST_API_MOVIE_BY_ID}/${movieId}`);
export const getMoviesForActor = (actorId) => axios.get(`${REST_API_MOVIES_FOR_ACTOR}/${actorId}`);
export const listMoviesByTitle = (title) => axios.get(`${REST_API_DEFAULT}/title/${title}`)
export const listMoviesByCinema = (cinemaId) => axios.get(`${REST_API_DEFAULT}/cinema/${cinemaId}`);

export const getAllGenres = (genres) => axios.get(`${REST_API_DEFAULT}/genres`);
export const getAllAgeRatings = (ageRatings) => axios.get(`${REST_API_DEFAULT}/ageRatings`);


export const addMovie = (movie) => axios.post(`${REST_API_DEFAULT}/admin/add`, movie);
export const updateMovie = (movieData) => axios.post(`${REST_API_DEFAULT}/admin/update`, movieData);
export const deleteMovie = (movieId) => axios.post(`${REST_API_DEFAULT}/admin/delete/${movieId}`);

export const listMoviesByPartialTitleAndCinemaId = (title, cinemaId) => {
  return axios.get(`${REST_API_DEFAULT}/title/${title}`, {
    params: {
      cinemaId: cinemaId
    }
  });
};

export const listMoviesByGenreAndCinemaId = (genre, cinemaId) => {
  return axios.get(`${REST_API_DEFAULT}/genre/${genre}/cinema`, {
    params: {
      cinemaId: cinemaId
    }
  });
};

export const listMoviesByDurationAndCinemaId = (duration, cinemaId) => {

  return axios.get(`${REST_API_DEFAULT}/duration/${duration}/cinema`, {
    params: {
      cinemaId: cinemaId
    }
  });
};

export const listMoviesByMultiFilter = (genre, year) => axios.get(`${REST_API_DEFAULT}/multi-filter`, {
    params: {
      genre: genre,
      year: year
    }
  });

  export const listMoviesByAllFilter = (cinemaId, releaseYear, duration, genre, title, showtimeDate) => {
    return axios.get(`${REST_API_DEFAULT}/all-filters`, {
      params: {
        cinemaId: cinemaId,
        releaseYear: releaseYear,
        duration: duration,
        genre: genre,
        title: title,
        showtimeDate: showtimeDate
      }
    });
  };

