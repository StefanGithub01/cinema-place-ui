import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/cinema';

export const listAllCinemas = () => axios.get(`${REST_API_BASE_URL}/all`);

export const addCinema = (cinema) => axios.post(`${REST_API_BASE_URL}/admin/add`, cinema);

export const updateCinema = (updatedCinema) => axios.post(`${REST_API_BASE_URL}/admin/update`, updatedCinema);

