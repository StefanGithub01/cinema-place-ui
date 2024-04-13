import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewsByMovieId, agreeReview, disagreeReview } from '../services/ReviewService';
import { getSingleMovie } from '../services/MovieService';
import { useAuth } from './header/AuthContext';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';
import { listVotedReviews } from '../services/UserService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './css/ListReviewComponent.css';

// Helper function to format date
const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const ListReviewComponent = () => {
  const { movieId, posterImageUrl } = useParams();
  const [reviews, setReviews] = useState([]);
  const [votedReviewIds, setVotedReviewIds] = useState([]);
  const { user } = useAuth();
  const [movieData, setMovieData] = useState(null); // State to hold movie data
  const [totalVotes, setTotalVotes] = useState(0);
  const [ratingConsensus, setRatingConsensus] = useState(0);
  const [sortCriteria, setSortCriteria] = useState('upvotes'); // State for sorting criteria

  useEffect(() => {
    fetchReviews();
    if (user) {
      updateVotedReviewIds(user.userId);
    }
    // Fetch movie data when component mounts
    getSingleMovie(movieId)
      .then((response) => {
        setMovieData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user, movieId, sortCriteria]);

  useEffect(() => {
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.ratingScore, 0);
      setRatingConsensus(totalRating / reviews.length);
      setTotalVotes(reviews.length);
    }
  }, [reviews]);

  const fetchReviews = () => {
    getReviewsByMovieId(movieId)
      .then((response) => {
        // Sort reviews based on the selected sorting criteria
        const sortedReviews = response.data.sort((a, b) => {
          if (sortCriteria === 'lowestGrade') {
            return a.ratingScore - b.ratingScore;
          } else if (sortCriteria === 'highestGrade') {
            return b.ratingScore - a.ratingScore;
          } else {
            // Default sorting by upvotes
            return b.upvotes - a.upvotes;
          }
        });
        setReviews(sortedReviews);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateVotedReviewIds = (userId) => {
    listVotedReviews(userId)
      .then((response) => {
        setVotedReviewIds(response.data.map(review => review.reviewId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAgree = (userId, reviewId) => {
    agreeReview(userId, reviewId)
      .then(() => {
        fetchReviews(); // Fetch updated reviews after agreeing
        updateVotedReviewIds(userId);
      });
  };

  const handleDisagree = (userId, reviewId) => {
    disagreeReview(userId, reviewId)
      .then(() => {
        fetchReviews(); // Fetch updated reviews after disagreeing
        updateVotedReviewIds(userId);
      });
  };

  return (
    <div className="container">
      {movieData && ( // Render only if movieData is available
        <div className="movie-card-review">
          <br/><br/><br/>
          <Row className="justify-content-center align-items-center">
            <Col xs={6}>
              <Image src={movieData.posterImageUrl} fluid style={{ maxWidth: '140px', maxHeight: '180px' }} />
            </Col>
            <Col xs={6}>
              <div className="text-white">
                <p>{movieData.title}</p>
                <h2>User Reviews:</h2>
                <p className='review-meta'>Total Votes: {totalVotes}</p>
                <p className='review-meta'>Rating Consensus: {ratingConsensus.toFixed(1)}/10</p>
              </div>
            </Col>
          </Row>
        </div>
      )}
      <div className="reviews">
          <div className="sorting-options">
              <label className='text-white'>Sort by:</label>
              <select value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)}>
                <option value="upvotes">Most Helpful</option>
                <option value="lowestGrade">Lowest Grade</option>
                <option value="highestGrade">Highest Grade</option>
              </select>
            </div>
        {reviews.map((review) => (
          <Card key={review.reviewId} className="mb-3">
            <Card.Body>
              <div className="review-header">
                <div className="review-rating">
                  <FontAwesomeIcon icon={faStar} className="star-icon" />
                   {review.ratingScore}/10
                </div>
                <div className="review-title">
                  <b>{review.title}</b>
                </div>
                <div className="review-meta">
                  <p><i>{review.user ? review.user.username : 'N/A'} - {formatDate(review.date)}</i></p>
                </div>
              </div>
              <div className="review-comment">
                {review.comment}
                <hr/>
              </div>
              <div className="review-actions">
              <p className='voting-text'>{review.agreeCount} out of {review.agreeCount + review.disagreeCount} found this helpful.</p>
                {!votedReviewIds.includes(review.reviewId) ? (
                  <div>
                    <Button variant="success" onClick={() => handleAgree(user.userId, review.reviewId)}>Agree</Button>
                    <Button variant="danger" onClick={() => handleDisagree(user.userId, review.reviewId)}>Disagree</Button>
                  </div>
                ) : (
                  <p className="text-muted">(You already voted)</p>
                )}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ListReviewComponent;
