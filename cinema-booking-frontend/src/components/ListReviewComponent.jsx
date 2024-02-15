import React, { useEffect, useState } from 'react';
import { listReviews } from '../services/ReviewService';
import { useAuth } from './header/AuthContext';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './css/ListMovieComponent.css'; // Import your CSS file

const ListReviewComponent = () => {
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    listReviews()
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Group reviews by movie poster
  const groupedReviews = reviews.reduce((acc, review) => {
    const posterUrl = review.movie ? review.movie.posterImageUrl : 'N/A';
    acc[posterUrl] = acc[posterUrl] || [];
    acc[posterUrl].push(review);
    return acc;
  }, {});

  // Calculate the total number of reviews for each movie
  const reviewsCountByMovie = Object.keys(groupedReviews).reduce((acc, posterUrl) => {
    acc[posterUrl] = groupedReviews[posterUrl].length;
    return acc;
  }, {});

  // Calculate the sum of all the reviews left so far
  const totalReviewsCount = Object.values(reviewsCountByMovie).reduce((sum, count) => sum + count, 0);

  return (
    <div className="container">
      <br/><br/><br/>
      <h2 className="text-center" style={{ color: 'white' }}>All Reviews:</h2>
      <p className="text-center" style={{ color: 'white' }}>Total number: {totalReviewsCount}</p>
      <br/>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {Object.keys(groupedReviews).map((posterUrl) => (
          <Col key={posterUrl}>
            <Card className="h-100 shadow">
              <Card.Img variant="top" src={posterUrl} alt="Movie Poster" />
              <Card.Body>
                <Card.Title className="mb-3">
                  <h3>{groupedReviews[posterUrl][0].movie ? groupedReviews[posterUrl][0].movie.title : 'N/A'}</h3>
                </Card.Title>
                {/* Calculate average rating for the movie */}
                <Card.Text>
                  <b>Rating Consensus:</b> {calculateAverageRating(groupedReviews[posterUrl])} {getRatingIndicator(calculateAverageRating(groupedReviews[posterUrl]))} 
                </Card.Text>
                <Card.Text>
                  <b>Reviews Nr:</b> {reviewsCountByMovie[posterUrl]}
                </Card.Text>
                {groupedReviews[posterUrl].map((review, index) => (
                  <div key={review.reviewId}>
                    <hr className="review-divider" />
                    <Card.Text>
                      <b>User:</b> {review.user ? review.user.username : 'N/A'}
                    </Card.Text>
                    <Card.Text className="mb-2">
                      <b>Rating:</b> {review.ratingScore} {getRatingIndicator(review.ratingScore)}
                    </Card.Text>
                    <Card.Text className="mb-2">
                      <b>Comment:</b> <br /> {review.comment}
                    </Card.Text>
                    {index < groupedReviews[posterUrl].length - 1 && <hr className="review-divider" />}
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

// Helper function to get rating indicator based on score
const getRatingIndicator = (ratingScore) => {
  if (ratingScore >= 8) {
    return '🥇';
  } else if (ratingScore >= 6) {
    return '🥈';
  } else if (ratingScore >= 5) {
    return '🥉';
  } else if (ratingScore < 5) {
    return '💩';
  } else {
    return 'No rating indicator';
  }
};

// Helper function to calculate average rating for a movie
const calculateAverageRating = (reviews) => {
  const totalRating = reviews.reduce((sum, review) => sum + review.ratingScore, 0);
  const averageRating = totalRating / reviews.length;
  return averageRating.toFixed(2);
};

export default ListReviewComponent;
