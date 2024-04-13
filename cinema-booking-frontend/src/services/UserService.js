import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/users';

export const listVotedReviews = (userId) => axios.get(`${REST_API_BASE_URL}/${userId}/votedReviews`);

export const listUsers = () => axios.get(`${REST_API_BASE_URL}/all`);