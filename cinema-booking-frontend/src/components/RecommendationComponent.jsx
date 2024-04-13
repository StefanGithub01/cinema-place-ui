import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './header/AuthContext';
import axios from 'axios';

const RecommendationComponent = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const userId = user.userId; 

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/recommendations/user/${userId}`);
        setRecommendations(response.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return (
    <div>
      <br/>
      <h1 className='title'> Recommended Movies:</h1>
      {recommendations.length > 0 ? (
        <div className="movie-list-container">
          <br/>
          {recommendations.map((movie) => (
            <div key={movie.movieId} className="movie-card">
              <div className="movie-detail">
                <div className="movie-poster">
                  <Link to={`/movie/${movie.movieId}`}>
                    <img
                      src={movie.posterImageUrl}
                      alt={movie.title}
                      width="150"
                      height="225"
                    />
                  </Link>
                </div>
                <div className="movie-title">
                  <h4 className="movie-text-title" style={{ color: 'white' }}>{movie.title}</h4>
                  <div className="movie-details">
                    <p className="movie-text-director" style={{ color: 'white' }}><b>Director:</b> {movie.director}</p>
                    <p className="movie-text-genre" style={{ color: 'white' }}><b>Genre:</b> {movie.genre}</p>
                    <p className="movie-text-date" style={{ color: 'white' }}><b>Release Date:</b> {new Date(movie.releaseDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ color: 'white', marginTop: '20px', textAlign: 'center' }}>
          <p>There are no recommended movies available. Please rate more movies 7 or higher.</p>
        </div>
      )}
    </div>
  );
};

export default RecommendationComponent;