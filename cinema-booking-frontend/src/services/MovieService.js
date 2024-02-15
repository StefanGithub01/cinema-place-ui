import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/movies/all';
const REST_API_MOVIES_GENRE = 'http://localhost:8080/api/movies/genre'; 
const REST_API_MOVIES_ACTORS = 'http://localhost:8080/api/movies'; 
const REST_API_MOVIE_BY_ID = 'http://localhost:8080/api/movies';
const REST_API_MOVIES_FOR_ACTOR = 'http://localhost:8080/api/movies/actor';

export const listMovies = () => axios.get(REST_API_BASE_URL);

export const listMoviesByGenre = (genre) => axios.get(`${REST_API_MOVIES_GENRE}/${genre}`);
export const listBookingsForUserId = (userId) => axios.get(`${REST_API_BASE_URL}/${userId}`);
export const getActorsForMovie = (movieId) => axios.get(`${REST_API_MOVIES_ACTORS}/${movieId}/actors`);
export const getSingleMovie = (movieId) => axios.get(`${REST_API_MOVIE_BY_ID}/${movieId}`);
export const getMoviesForActor = (actorId) => axios.get(`${REST_API_MOVIES_FOR_ACTOR}/${actorId}`);

