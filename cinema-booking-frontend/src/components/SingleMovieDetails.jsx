import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleMovie} from '../services/MovieService';
import './css/SingleMovieDetails.css';
import { useNavigate } from "react-router-dom";
import { listShowTimesForMovie } from '../services/ShowtimeService';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon you want to use
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTicketAlt} from "@fortawesome/free-solid-svg-icons"; // Import the specific icons you want to use

const SingleMovieDetails = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [showtimes, setShowtimes] = useState([]);
    const [showShowtimes, setShowShowtimes] = useState(false);
    const navigator = useNavigate();

    useEffect(() => {
        // Fetch movie details based on the movieId
        getSingleMovie(movieId)
            .then(response => {
                setMovie(response.data);
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
            });
            listShowTimesForMovie(movieId)
            .then(response => {
                setShowtimes(response.data);
            })
            .catch(error => {
                console.error('Error fetching showtimes:', error);
            });    
    }, [movieId]);

    const getYouTubeVideoId = (url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        return urlParams.get('v');
    };

    const formatDuration = (duration) => {
        if (!duration) return ''; // Return empty string if duration is null or undefined
    
        const hours = parseInt(duration.match(/\d+H/)?.[0]) || 0;
        const minutes = parseInt(duration.match(/\d+M/)?.[0]) || 0;
        return `${hours}h${minutes}m`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    };
    const formatTime = (timeString) => {
        return new Date(timeString).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      };
      
    const addNewReview = () => {
        const encodedPosterImageUrl = encodeURIComponent(movie.posterImageUrl);
        navigator(`/add-review/${movieId}/${encodedPosterImageUrl}`);
    };

    const redirectToReviews = () => {
        const encodedPosterImageUrl = encodeURIComponent(movie.posterImageUrl);
        navigator(`/reviews/${movieId}/${encodedPosterImageUrl}`);
    };

    const groupShowtimesByCinemaAndDate = (showtimes) => {
        const groupedShowtimes = [];
        const cinemaGroups = {};
      
        showtimes.forEach((showtime) => {
          const cinemaId = showtime.cinema.cinemaId; // Assuming you have a property named cinemaId in your showtime object
          const cinemaName = showtime.cinema.name; // Assuming you have a property named name in your cinema object
          const showtimeDate = new Date(showtime.startTime).toLocaleDateString("en-GB");
      
          if (!cinemaGroups[cinemaName]) {
            cinemaGroups[cinemaName] = { cinemaName: cinemaName, showtimes: [] };
          }
      
          cinemaGroups[cinemaName].showtimes.push({
            ...showtime,
            date: showtimeDate,
          });
        });
      
        // Convert cinemaGroups object to array
        Object.values(cinemaGroups).forEach((group) => {
          groupedShowtimes.push(group);
        });
      
        return groupedShowtimes;
      };

      function handleShowtimeClick(showtime) {
        navigator(`/buy-tickets/${showtime.showtimeId}`, {
          state: {
            showtime,
            seatGrid: showtime.seatGrid,
          },
        });
      }

    return (
        <div className="single-movie-container">
            <br/>            
            <br/>

            {movie ? (
                <div className="single-movie-details">
                    {/* Movie details */}
                    <div className="movie-header">
                        <h1 className="title-text">{movie.title}</h1>
                        <p>{formatDate(movie.releaseDate)} | {movie.rated} | {formatDuration(movie.duration)}</p>
                    </div>
                    <div className="movie-poster-and-trailer">
                        <div className="movie-poster">
                            <img src={movie.posterImageUrl} alt={movie.title} />
                        </div>
                        <div className="movie-trailer">
                            <iframe
                                width="750"
                                height="400"
                                src={`https://www.youtube.com/embed/${getYouTubeVideoId(movie.trailerLink)}`}
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                            ></iframe>
                        </div>
                    </div>
                    <div className="movie-info">
                        <p><strong>Genre:</strong> {movie.genre}</p>
                        <p><strong>Description:</strong> {movie.description}</p>
                        <p><strong>Director:</strong> {movie.director}</p>
                    </div>

                    {/* Buttons */}
                    <div className="single-button-group">
                        <button className="movie-buttons" onClick={redirectToReviews}>
                        <FontAwesomeIcon icon={faStar} /> View Reviews</button>
                        <button className="movie-buttons" onClick={addNewReview}>
                        <FontAwesomeIcon icon={faPenToSquare} /> Write a Review</button>
                        {/* Showtimes Button */}
                        <button className="movie-buttons" onClick={() => setShowShowtimes(!showShowtimes)}>
                        <FontAwesomeIcon icon={faTicketAlt} /> View Showtimes
                        </button>
                    </div>

                    {/* Showtimes */}
                    {showShowtimes && (
                    <div className="showtimes-container">
                        <h3 className="title-text">Showtimes:</h3>
                        <ul className="showtimes-list">
                        {groupShowtimesByCinemaAndDate(showtimes).map(
                            (cinemaGroup) => (
                            <li key={cinemaGroup.cinemaName}>
                                <h4>{cinemaGroup.cinemaName}</h4>
                                <ul>
                                {cinemaGroup.showtimes
                                    //.filter((showtime) => new Date(showtime.startTime) >= new Date()) // Filter out showtimes that are before the current date
                                    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
                                    .map((showtime) => (
                                    <li
                                        key={showtime.showtimeId}
                                        className="showtime-button"
                                        onClick={() => handleShowtimeClick(showtime)}
                                    >
                                        <span> <b>{showtime.date} </b></span>
                                        <button>
                                        {formatTime(showtime.startTime)} -{" "}
                                        {formatTime(showtime.endTime)}
                                        </button>
                                    </li>
                                    ))}
                                </ul>
                            </li>
                            )
                        )}
                        </ul>
                    </div>
                    )}                

                    <div className="actors">
                        <h3>Stars:</h3>
                        <div className="actor-list">
                            {movie.actors && movie.actors.map(actor => (
                                <div className="actor" key={actor.actorId}>
                                    <img src={actor.avatarImageUrl} alt={`${actor.firstName} ${actor.lastName}`} className="actor-image" />
                                    <p>{actor.firstName} {actor.lastName}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default SingleMovieDetails;