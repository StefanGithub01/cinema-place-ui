import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/reviews';

export const listMovies = () => axios.get(REST_API_BASE_URL);

export const createReview = (review) => axios.post(`${REST_API_BASE_URL}/createReview`, review);
export const updateReview = (review) => axios.post(`${REST_API_BASE_URL}/admin/update`, review);

export const listReviews = () => axios.get(REST_API_BASE_URL);

export const getReviewById = (reviewId) => axios.get(`${REST_API_BASE_URL}/getReview/${reviewId}`);


export const listReviewsForUserId = (userId) => axios.get(`${REST_API_BASE_URL}/user/${userId}`);

export const removeReview = (reviewId) => axios.delete(`${REST_API_BASE_URL}/delete/${reviewId}`);

export const agreeReview = (userId, reviewId) => axios.put(`${REST_API_BASE_URL}/${reviewId}/${userId}/agree`);

export const disagreeReview = (userId, reviewId) => axios.put(`${REST_API_BASE_URL}/${reviewId}/${userId}/disagree`);

export const getReviewsByMovieId = (movieId) => axios.get(`${REST_API_BASE_URL}/reviews/${movieId}`);


