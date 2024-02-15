import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ReviewForm from '../reviewform/ReviewForm';
import axios from 'axios';  

const Reviews = ({ movieId }) => {
  const revText = useRef();
  const ratingRef = useRef(1);
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(`/api/movies/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovieData();
  }, [movieId]);

  const addReview = async (e) => {
    e.preventDefault();
    const reviewText = revText.current.value;
  
    // Log the data being sent in the POST request
    console.log('Data being sent in POST request:', {
      userId: 1, // Replace with the actual user ID
      movieId: 1,
      ratingScore: ratingRef.current,
      comment: reviewText,
    });
  
    try {
      const response = await axios.post('http://localhost:8080/api/reviews', {
        userId: 1, // Replace with the actual user ID
        movieId: movieId,
        ratingScore: ratingRef.current,
        comment: reviewText,
      });
  
      // Update the reviews state with the new review
      setReviews([...reviews, response.data]);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };
  

  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <>
            <Row>
              <Col>
                <ReviewForm
                  handleSubmit={addReview}
                  revText={revText}
                  rating={ratingRef}
                  labelText="Write a Review:"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <hr />
              </Col>
            </Row>
          </>
          {reviews?.map((r) => (
            <Row key={r.reviewId}>
              <Col>{r.comment}</Col>
              <Col>{r.ratingScore}</Col>
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
