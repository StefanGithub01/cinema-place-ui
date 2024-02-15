import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/actors/all';

export const listActors = () => axios.get(REST_API_BASE_URL);
