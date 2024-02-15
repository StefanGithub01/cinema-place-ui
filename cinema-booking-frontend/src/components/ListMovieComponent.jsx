import React, { useEffect, useState } from "react";
import { listMovies, listMoviesByGenre, getActorsForMovie } from "../services/MovieService";
import { Paper, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { listShowTimesForMovie } from "../services/ShowtimeService";
import "./css/ListMovieComponent.css"; // Import your CSS file
import SeatSelectionComponent from "./SeatSelectionComponent";

const MovieCard = React.memo(({ movie, handleMovieSelect }) => {
  const [movieShowtimes, setMovieShowtimes] = useState({});
  const [actors, setActors] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    listShowTimesForMovie(movie.movieId)
      .then((response) => {
        setMovieShowtimes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    
    // Fetch actors for the movie
    getActorsForMovie(movie.movieId)
      .then((response) => {
        setActors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [movie.movieId]);

  function addNewReview(movieId, posterImageUrl) {
    const encodedPosterImageUrl = encodeURIComponent(posterImageUrl);
    navigator(`/add-review/${movieId}/${encodedPosterImageUrl}`);
  }

  function handleShowtimeClick(showtime) {
    navigator(`/buy-tickets/${showtime.showtimeId}`, {
      state: {
        showtime,
        seatGrid: showtime.seatGrid,
      },
    });
  }

  return (
    <Paper key={movie.movieId} className="movie-card">
      <div className="movie-detail">
        <div className="movie-poster">
          <img
            src={movie.posterImageUrl}
            alt=""
            width="150"
            height="225"
          />
        </div>
        <div className="movie-title">
          <h4 className="movie-text-title">{movie.title}</h4>
          <div className="movie-details">
            <p className="movie-text-director"><b>Director:</b> {movie.director}</p>
            <p className="movie-text-genre"><b>Genre:</b> {movie.genre}</p>
            <p className="movie-text-date"><b>Release Date:</b> {formatDate(movie.releaseDate)}</p>
            <div className="actors-container">
  <h4>Top Billed:</h4>
  {actors.map(actor => (
    <div key={actor.actorId} className="actor-info">
      <img src={actor.avatarImageUrl} alt={`${actor.firstName} ${actor.lastName}`} className="actor-image" />
      <div className="actor-details">
        <p><b>{actor.firstName} {actor.lastName}</b></p>
        <p><b>Age:</b> {getAge(actor.birthDate, movie.releaseDate)} years</p>
      </div>
    </div>
  ))}
</div>
          </div>
        </div>
        <div className="play-button-icon-container">
          <Link className="trailer-container"
            to={`/Trailer/${movie.trailerLink.substring(
              movie.trailerLink.length - 11
            )}`}>
            <FontAwesomeIcon
              className="play-button-icon"
              icon={faCirclePlay}
            />
            <span> Play Trailer</span>
          </Link>
          <button
            className="btn btn-primary"
            onClick={() => addNewReview(movie.movieId, movie.posterImageUrl)}>
            Write a Review
          </button>
          <Button onClick={() => handleMovieSelect(movie.movieId)}>
            View Showtimes
          </Button>

          {movieShowtimes.length > 0 && (
            <div className="showtimes-container">
              <h3>Showtimes: </h3>
              <ul className="showtimes-list">
                {groupShowtimesByDate(movieShowtimes).map(
                  (groupedShowtime) => (
                    <li
                      key={groupedShowtime.date}
                      className="showtime-item">
                      <strong>{groupedShowtime.date}</strong>
                      <ul>
                        {groupedShowtime.showtimes.map((showtime) => (
                          <li
                            key={showtime.showtimeId}
                            className="showtime-button"
                            onClick={() => handleShowtimeClick(showtime)}>
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
        </div>
      </div>
    </Paper>
  );
});

const ListMovieComponent = () => {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const navigator = useNavigate();

  useEffect(() => {
    if (selectedGenre) {
      listMoviesByGenre(selectedGenre)
        .then((response) => {
          setMovies(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      listMovies()
        .then((response) => {
          setMovies(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedGenre]);

  function handleMovieSelect(movieId) {
    // Handle the selected movie here if needed
  }

  function handleGenreClick(genre) {
    setSelectedGenre(genre === selectedGenre ? null : genre);
  }

  return (
    <div>
      <div className="genre-buttons-container">
        <button onClick={() => handleGenreClick(null)}>All Genres</button>
        <button onClick={() => handleGenreClick("Action")}>Action</button>
        <button onClick={() => handleGenreClick("Comedy")}>Comedy</button>
        <button onClick={() => handleGenreClick("Fantasy")}>Fantasy</button>
        <button onClick={() => handleGenreClick("Science Fiction")}>Science Fiction</button>
        <button onClick={() => handleGenreClick("SuperHero")}>SuperHero</button>
        <button onClick={() => handleGenreClick("Drama")}>Drama</button>
        <button onClick={() => handleGenreClick("Animation")}>Animation</button>
        <button onClick={() => handleGenreClick("Thriller")}>Thriller</button>
        <button onClick={() => handleGenreClick("Crime")}>Crime</button>
      </div>
      <div className="movie-list-container">
        {movies.map((movie) => (
          <MovieCard key={movie.movieId} movie={movie} handleMovieSelect={handleMovieSelect} />
        ))}
      </div>
    </div>
  );
};

const groupShowtimesByDate = (showtimes) => {
  const groupedShowtimes = [];
  showtimes.forEach((showtime) => {
    const showtimeDate = new Date(showtime.startTime).toLocaleDateString("en-GB");
    let group = groupedShowtimes.find((group) => group.date === showtimeDate);
    if (!group) {
      group = { date: showtimeDate, showtimes: [] };
      groupedShowtimes.push(group);
    }
    group.showtimes.push(showtime);
  });
  return groupedShowtimes;
};

const formatTime = (timeString) => {
  return new Date(timeString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-GB");
};

const getAge = (birthDate, releaseDate) => {
  const birthYear = new Date(birthDate).getFullYear();
  const releaseYear = new Date(releaseDate).getFullYear();
  return releaseYear - birthYear;
};

export default ListMovieComponent;