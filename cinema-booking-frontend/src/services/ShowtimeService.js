
import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/showtimes/';

export const listShowTimesForMovie = (movieId) => axios.get(`${REST_API_BASE_URL}movie/${movieId}`);

export const listAllShowtimes = () => axios.get((`${REST_API_BASE_URL}all`));

export const addShowtime = (showtimeData) => axios.post(`${REST_API_BASE_URL}admin/add`, showtimeData);

export const updateShowtime = (showtimeData) => axios.post(`${REST_API_BASE_URL}admin/update`, showtimeData);



export const listShowTimesForMovieAtCinema = (movieId, cinemaId) => {
  return axios.get(`${REST_API_BASE_URL}movie/${movieId}/cinema`, {
    params: {
      cinemaId: cinemaId
    }
  });
};

export const getMoviesWithShowtimesOnDate = (date) => {
    return axios.get(`${REST_API_BASE_URL}movies`, {
      params: {
        date: date // Assuming date is in ISO format (e.g., '2024-02-20T00:00:00')
      }
    });
  };

  export const getMoviesWithShowtimesOnDateAtCinema = (date, cinemaId) => {
    return axios.get(`${REST_API_BASE_URL}movies/cinema`, {
      params: {
        date: date,
        cinemaId: cinemaId 
      }
    });
  };