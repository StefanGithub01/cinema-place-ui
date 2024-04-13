import React, { useEffect, useState } from 'react';
import { listReviewsForUserId, removeReview} from '../services/ReviewService'; // Import the service function to get movie details
import { useAuth } from './header/AuthContext';

const ListReviewsForUser = () => {
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    listReviewsForUserId(user.userId)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [user.userId]);

  // Initialize variable to track review number
  let reviewNumber = 1;

  // Function to handle cancellation of a booking
  const handleRemoveReview = async (reviewId) => {
    try {
      await removeReview(reviewId);
      // Update reviews List
      const updatedReviews = reviews.filter(reviews => reviews.reviewId !== reviewId);
      setReviews(updatedReviews);
      alert("Review Removed Succesfully!")
    } catch (error) {
      console.error('Error removing review:', error);
      alert("Something went wrong...")
    }
  };

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


  return (
    <div className='container'>
      <h2 className='title'>List of Reviews</h2>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Nr.</th>
            <th>Movie</th>
            <th>Rating</th>
            <th>Title</th>
            <th>Comment</th>
            <th>Review Date</th>
            <th>Remove Review</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <tr key={review.reviewId}>
              <td>{reviewNumber++}</td>
              <td><img src={review.movie.posterImageUrl} alt={review.movie.title} style={{ width: '100px' }} /> </td>
              <td>{review.ratingScore} {getRatingIndicator(review.ratingScore)}</td>
              <td>{review.title}</td>
              <td>{review.comment}</td>
              <td>{formatDate(review.date)}</td>
              <td>
                <button className="cancel-button" onClick={() => handleRemoveReview(review.reviewId)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default ListReviewsForUser;

 // Function to format the date
 const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };