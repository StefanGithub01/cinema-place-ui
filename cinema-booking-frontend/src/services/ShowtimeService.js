// ShowtimeService.js

import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/showtimes/';

export const listShowTimesForMovie = (movieId) => axios.get(`${REST_API_BASE_URL}movie/${movieId}`);
