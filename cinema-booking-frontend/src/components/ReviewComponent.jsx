import React, { useState } from 'react';
import { createReview } from '../services/ReviewService';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from './header/AuthContext';

const ReviewComponent = () => {
  const [ratingScore, setRatingScore] = useState('');
  const [comment, setComment] = useState('');
  const [title, setTitle] = useState('');
  const { movieId, posterImageUrl } = useParams();
  const navigator = useNavigate();
  const { user } = useAuth();

  function saveReview(e) {
    e.preventDefault();

    if (!user || !user.userId) {
      console.error('User not authenticated.');
      return;
    }

    const review = {
      userId: user.userId,
      movieId,
      title,
      ratingScore,
      comment,
    };

    createReview(review)
      .then((response) => {
        console.log(response.data);
        alert("Review Posted");
        const encodedPosterImageUrl = encodeURIComponent(posterImageUrl);
        navigator(`/reviews/${movieId}/${encodedPosterImageUrl}`);
      })
      .catch((error) => {
        console.error('Error creating review:', error);
        alert("Something went wrong, review not posted");
        console.log("Review that tried to be sent:", review);
      });
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <img src={posterImageUrl} alt="Movie Poster" className="img-fluid" />
        </div>

        <div className="col-md-8">
          <div className="card">
            <h2 className="card-header text-center">Add Review</h2>
            <div className="card-body">
              <form>

                <div className="mb-3">
                  <label className="form-label">Rating Score:</label>
                  <input
                    type="number"
                    placeholder="Enter Score"
                    name="ratingScore"
                    value={ratingScore}
                    className="form-control"
                    onChange={(e) => {
                      const inputValue = parseFloat(e.target.value);
                      if (!isNaN(inputValue) && inputValue >= 1 && inputValue <= 10) {
                        setRatingScore(inputValue);
                      }
                    }}
                    min="1"
                    max="10"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Title:</label>
                    <input
                     type="text"
                     placeholder='Enter review title'
                     name="title" 
                     value={title}
                     className="form-control" 
                     onChange={(e) => setTitle(e.target.value)}/>
                </div>

                <div className="mb-4">
                  <label className="form-label">Comment:</label>
                  <textarea
                    type="text"
                    placeholder="Enter Review"
                    name="comment"
                    value={comment}
                    className="form-control"
                    onChange={(e) => setComment(e.target.value)}
                    rows={8} 
                  ></textarea>
                </div>
                <button className="btn btn-success" onClick={saveReview}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
