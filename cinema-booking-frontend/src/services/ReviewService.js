import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/reviews';

export const listMovies = () => axios.get(REST_API_BASE_URL);

export const createReview = (review) => axios.post(REST_API_BASE_URL, review);

export const listReviews = () => axios.get(REST_API_BASE_URL);

export const listReviewsForUserId = (userId) => axios.get(`${REST_API_BASE_URL}/user/${userId}`);

export const removeReview = (reviewId) => axios.delete(`${REST_API_BASE_URL}/delete/${reviewId}`);
