import React, { useState, useEffect } from 'react';
import { updateReview, getReviewById } from '../../services/ReviewService';

const EditReviews = ({ reviewId, cancelEdit, updateReviews }) => {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editedReview, setEditedReview] = useState({
    title:'',
    ratingScore: '',
    comment: ''
  });

  useEffect(() => {
    fetchReview();
  }, []);

  const fetchReview = async () => {
    try {
      setLoading(true);
      const response = await getReviewById(reviewId);
      setReview(response.data);
      setEditedReview({
        title: response.data.title || '', 
        ratingScore: response.data.ratingScore,
        comment: response.data.comment
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedReview(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!review) return; // Check if review data is available
      const updatedReviewDto = {
        reviewId: review.reviewId,
        userId: review.userId,
        movieId: review.movieId,
        title: editedReview.title, 
        ratingScore: editedReview.ratingScore,
        comment: editedReview.comment
      };
  
      const response = await updateReview(updatedReviewDto);
      console.log("updatedReviewDto", updatedReviewDto);
      console.log('Review updated successfully:', response.data);
      alert('Review updated successfully');
      updateReviews();
      cancelEdit();
    } catch (error) {
      console.error('Error updating review:', error);
      alert('Something went wrong...');
    }
  };
  
  // Render form only when review data is available
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {review && (
        <form onSubmit={handleSubmit}>
          <h2 className="text-white">Edit Review</h2> 
          <div className="form-group">
            <label className="text-white">Rating Score:</label>
            <input type="number" name="ratingScore" value={editedReview.ratingScore} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="text-white">Title:</label>
            <input
              type="text"
              placeholder='Enter review title'
              name="title" 
              value={editedReview.title}
              className="form-control" 
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Comment:</label>
            <textarea name="comment" value={editedReview.comment} onChange={handleChange} />
          </div>
          <button className = 'buttonAdmin' type="submit">Submit</button>
          <button className = "cancel-buttonAdmin" onClick={cancelEdit}>Cancel</button>

        </form>
      )}
    </div>
  );
};

export default EditReviews;
