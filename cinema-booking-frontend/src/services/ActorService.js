import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/actors/all';
const REST_API = 'http://localhost:8080/api/actors';

export const listActors = () => axios.get(REST_API_BASE_URL);
export const addActor = (actor) => axios.post(`${REST_API}/admin/add`, actor);

export const updateActor = (actor) => axios.post(`${REST_API}/admin/update`, actor);


