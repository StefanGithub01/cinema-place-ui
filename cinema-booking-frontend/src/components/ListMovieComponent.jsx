import React, { useState, useEffect } from "react";
import { listMovies, listMoviesByGenre, getActorsForMovie, listMoviesByYear, listMoviesByMultiFilter, listMoviesByTitle, listMoviesByCinema, listMoviesByPartialTitleAndCinemaId, listMoviesByDurationAndCinemaId, listMoviesByGenreAndCinemaId, getAllGenres, listMoviesByAllFilter } from "../services/MovieService";
import { Paper, Button, Slider, Typography, Select, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { listShowTimesForMovie, getMoviesWithShowtimesOnDate, listShowTimesForMovieAtCinema, getMoviesWithShowtimesOnDateAtCinema } from "../services/ShowtimeService";
import "./css/ListMovieComponent.css"; // Import your CSS file
import SeatSelectionComponent from "./SeatSelectionComponent";
import SearchMoviesBar from "./SearchMoviesBar";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar'; // Import a calendar component
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { listAllCinemas } from "../services/CinemaService";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MovieRatingComponent from "./MovieRatings";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon you want to use
import { faStar, faTicketAlt } from "@fortawesome/free-solid-svg-icons"; // Import the specific icons you want to use
import { faUsers } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon you want to use
import { useLocation } from 'react-router-dom';


const MovieCard = React.memo(({ movie, selectedCinema }) => {
  const [movieShowtimes, setMovieShowtimes] = useState([]);
  const [actors, setActors] = useState([]);
  const [showActors, setShowActors] = useState(false);
  const [showShowtimes, setShowShowtimes] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    // afiseaza showtimes ale cinema-ului selectat
    if (selectedCinema) {
      listShowTimesForMovieAtCinema(movie.movieId, selectedCinema.cinemaId)
        .then((response) => {
          setMovieShowtimes(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
// afiseaza showtimes de la toate cinema-urile
      }else {
        listShowTimesForMovie(movie.movieId)
          .then((response) => {
            setMovieShowtimes(response.data);
          })
          .catch((error) => {
            console.error(error);
          }); 
      }
    // Fetch actors for the movie
    getActorsForMovie(movie.movieId)
      .then((response) => {
        setActors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [movie.movieId, selectedCinema]);

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

  function redirectToReviews(movieId, posterImageUrl) {
    const encodedPosterImageUrl = encodeURIComponent(posterImageUrl);
    navigator(`/reviews/${movieId}/${encodedPosterImageUrl}`);
  }


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
  

  return (
    <Paper key={movie.movieId} className="movie-card">
      <div className="movie-detail">
       {/* Wrap the poster image with Link */}
       <Link to={{ pathname: `/movie/${movie.movieId}`}}>
        <div className="movie-detail">
          <div className="movie-poster">
            <img
              src={movie.posterImageUrl}
              alt=""
              width="150"
              height="225"
            />
          </div>
        </div>
      </Link>
      {/* Rest of the movie details */}
        <div className="movie-title">
          <h4 className="movie-text-title">{movie.title}</h4>
          <div className="movie-details">
            <MovieRatingComponent  movieTitle = {movie.imdbMovieId} />
            <p className="movie-text-director"><b>Director:</b> {movie.director}</p>
            <p className="movie-text-genre"><b>Genre:</b> {movie.genre}</p>
            <p className="movie-text-date"><b>Release Date:</b> {formatDate(movie.releaseDate)}</p>
            <div className="actors-container">
              {/* Button to toggle display of Top Billed Actors */}
              <button className="movie-buttons" onClick={() => setShowActors(!showActors)}>
                  <FontAwesomeIcon icon={faUsers} /> View Top Actors  {/* Display Top Billed Actors if showActors is true */}
              </button>             
              {showActors && (
                <div>
                  <h4>Top Actors:</h4>
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
              )}
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
          <div className="button-group">
            <button className="movie-buttons" onClick={() => redirectToReviews(movie.movieId, movie.posterImageUrl)}>
            <FontAwesomeIcon icon={faStar} /> View Reviews
            </button>
            <button className="movie-buttons" onClick={() => addNewReview(movie.movieId, movie.posterImageUrl)}>
            <FontAwesomeIcon icon={faPenToSquare} /> Write a Review
            </button>
            <button className="movie-buttons" onClick={() => setShowShowtimes(!showShowtimes)}>
            <FontAwesomeIcon icon={faTicketAlt} /> View Showtimes
            </button>
          </div>

{showShowtimes && movieShowtimes.length > 0 && (
  <div className="showtimes-container">
    <h3>Showtimes:</h3>
    <ul className="showtimes-list">
      {groupShowtimesByCinemaAndDate(movieShowtimes).map(
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
                    <span>{showtime.date}</span>
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

// -----> ListMovieComponent!

const ListMovieComponent = () => {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedYear, setSelectedYear] = useState(""); // Initialize selectedYear to an empty string
  const [emptySearchQuery, setEmptySearchQuery] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // Step 1: State for search query
  const [selectedDate, setSelectedDate] = useState(null); // Initialize selectedDate to null
  const [showCalendar, setShowCalendar] = useState(false); // State variable for calendar visibility
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null); // State variable for selected cinema
  const [cinemaMovies, setCinemaMovies] = useState([]); // State variable for movies in selected cinema
  const [genres, setGenres] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [showFilters, setShowFilters] = useState(false); // Step 1: State for managing filter visibility
  const [years, setYears] = useState([]);

  const fetchMovies = () => {
    if (selectedCinema || selectedYear || selectedGenre || selectedDuration || searchQuery || selectedDate) {
      //console.log("data sent", selectedCinema.cinemaId, " ", selectedYear, " ", selectedGenre, " ", selectedDuration);
      console.log("data sent no format:", selectedDate);
      let formattedDate = null;

      if(selectedDate != null) {
        const year = selectedDate.getFullYear();
        const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because months are zero-based
        const day = selectedDate.getDate().toString().padStart(2, '0');
        formattedDate = `${year}-${month}-${day}`;
      }
      console.log("data sent formated:", formattedDate);
      listMoviesByAllFilter(
        selectedCinema ? selectedCinema.cinemaId : null, // Pass cinemaId if selected, otherwise pass null
        selectedYear ? selectedYear.toString() : null, // Pass year if selected, otherwise pass null
        selectedDuration ? selectedDuration : null,
        selectedGenre ? selectedGenre : null,
        searchQuery ? searchQuery : null,
        selectedDate ? formattedDate: null
      )
      /*
      params: {
        cinemaId: cinemaId,
        releaseYear: releaseYear,
        duration: duration,
        genre: genre,
        title: title,
        showtimeDate: showtimeDate
      }
      */
      .then((response) => {
        setMovies(response.data);
        console.log("reponse is", response.data);

      })
      .catch((error) => {
        console.log("reponse is", response.data);
        console.error(error);
      });
    /*
    else if (selectedCinema && selectedDate) { // Check if both selectedCinema and selectedDate are truthy
      fetchMoviesWithShowtimesAtCinema(selectedDate, selectedCinema.cinemaId);
    } else if(selectedDate) {
      fetchMoviesWithShowtimesAtCinema(selectedDate);
    } else if (selectedCinema && searchQuery) {
      // Fetch movies based on partial title and selected cinema
      listMoviesByPartialTitleAndCinemaId(searchQuery, selectedCinema.cinemaId)
        .then((response) => {
          setMovies(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
        */
        /*
      }else if(selectedCinema && selectedGenre) {
        listMoviesByGenreAndCinemaId(selectedGenre, selectedCinema.cinemaId)
        .then((response) => {
          setMovies(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      }else if(selectedCinema && selectedDuration) {
        listMoviesByDurationAndCinemaId (selectedDuration, selectedCinema.cinemaId)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      */
      /*
    } else if (selectedCinema) {
      // Fetch movies based only on selected cinema
      listMoviesByCinema(selectedCinema.cinemaId)
        .then((response) => {
          setMovies(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (searchQuery) {
      // Fetch movies based only on partial title
      listMoviesByTitle(searchQuery)
        .then((response) => {
          setMovies(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (selectedGenre || selectedYear) {
      if (selectedGenre && selectedYear) {
        listMoviesByMultiFilter(selectedGenre, selectedYear)
          .then((response) => {
            setMovies(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (selectedGenre) {
        listMoviesByGenre(selectedGenre)
          .then((response) => {
            setMovies(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        listMoviesByYear(selectedYear)
          .then((response) => {
            setMovies(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
       */
    } else {
      // If no conditions match, fetch all movies
      listMovies()
        .then((response) => {
          setMovies(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
   
  };
  
  /*
  const fetchMoviesWithShowtimesAtCinema = async (selectedDate, cinemaId) => {

    try {

      // Format the selected date properly before sending the request

      const year = selectedDate.getFullYear();
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because months are zero-based
      const day = selectedDate.getDate().toString().padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;
      
      
      console.log('Formatted Date:', formattedDate); // Log the formatted date

      // Send the request with the formatted date

      let response;
    if (cinemaId == null) {
      response = await getMoviesWithShowtimesOnDate(formattedDate);
    } else {
      response = await getMoviesWithShowtimesOnDateAtCinema(formattedDate, cinemaId);
    }
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies with showtimes:', error);
    }
  };
  */
  const fetchCinemas = async () => {
    try {
      const response = await listAllCinemas();
      setCinemas(response.data); // Set the state with fetched cinemas
    } catch (error) {
      console.error('Error fetching cinemas:', error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await getAllGenres();
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

useEffect(() => {
  fetchGenres();
  fetchCinemas();
  fetchMovies();
}, [selectedCinema, selectedGenre, selectedYear, searchQuery, selectedDate, selectedDuration]);

useEffect(() => {
  if (movies.length > 0) {
    // Extracting years from movies
    const years = Array.from(new Set(movies.map(movie => new Date(movie.releaseDate).getFullYear())));
    // Sorting years in ascending order
    years.sort((a, b) => a - b);
    setYears(years); // Set the state with the generated years array
  }
}, [movies]);

  const handleSearchResults = (searchResults, isEmptySearchQuery) => {
    // Check if the search query has changed
    if (isEmptySearchQuery !== emptySearchQuery) {
      setEmptySearchQuery(isEmptySearchQuery); // Update the emptySearchQuery state
    }
  
    // Update the movies state only if the search query is empty or the search results have changed
    if (isEmptySearchQuery || JSON.stringify(searchResults) !== JSON.stringify(movies)) {
      setMovies(searchResults);
    }
  };

  const handleDurationFilter = (selectedDuration) => {
    setSelectedDuration(selectedDuration);
  };

  function handleGenreClick(genre) {
    setSelectedGenre(genre === selectedGenre ? null : genre);
  }

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value); // Update selectedYear state
  };

  const clearFilters = () => {
    setSelectedGenre(null); // Reset selectedGenre to null
    setSelectedYear(null); // Reset selectedYear to null
    setSelectedDuration(null); // Reset selectedDuration to null
    setSelectedDate(null); // Reset selectedDate to null
    setSelectedCinema(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); // Step 4: Handle date change
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar); // Toggle the state variable for calendar visibility
  };

  // Cinema Logic

  const handleCinemaChange = (event) => {
    const cinemaId = event.target.value;
    const selectedCinema = cinemas.find((cinema) => cinema.cinemaId === cinemaId);
    setSelectedCinema(selectedCinema);
  };

  // Filters

  const toggleFilters = () => {
    setShowFilters(!showFilters); // Step 2: Function to toggle filter visibility
  };

  return (
    <div className="container">
      <br/><br/><br/>
      <div className="filter-container">
        {/* Button to toggle filter visibility */}
        <div className="toggle-filters-button">
          <Button onClick={toggleFilters}>
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>
        
        {/* FILTERS */}

        {showFilters && (
          
          <div>
            {/* Select Location */}
            <div className="cinema-select">
              <p className="filter-label"> Selected Cinema: </p>
                <Select
                  value={selectedCinema ? selectedCinema.cinemaId : ''}
                  onChange={handleCinemaChange}
                  startIcon={<LocationOnIcon />}
                  displayEmpty
                  className="cinema-menu"
                  style={{ color: 'white'}} 
                >
                  <MenuItem value="" disabled>
                      Choose a location
                  </MenuItem>
                  {cinemas.map((cinema) => (
                    <MenuItem key={cinema.cinemaId} value={cinema.cinemaId}>
                      {cinema.name} - {cinema.location}
                    </MenuItem>
                  ))}
                </Select>
            </div>
          {/* Year Filter */}
          <div className="year-slider-container">
            <p className="filter-label">Selected Year: </p>
              <Select
                value={selectedYear ? selectedYear : ''}
                onChange={handleYearChange}
                displayEmpty
                className="year-select"
                style={{ color: 'white'}} 
              >
                <MenuItem value="" disabled>
                  Select Year
                </MenuItem>
                {/* Mapping through years to create menu items */}
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
          </div>
  
            {/* Duration Filter */}
            <div className="duration-buttons-container">
              <p className="filter-label">Duration: </p>
              <button className={selectedDuration === 90 ? "selected-button" : "unselected-button"} onClick={() => handleDurationFilter(90)}>1H30M</button>
              <button className={selectedDuration === 120 ? "selected-button" : "unselected-button"} onClick={() => handleDurationFilter(120)}>2H</button>
              <button className={selectedDuration === 150 ? "selected-button" : "unselected-button"} onClick={() => handleDurationFilter(150)}>2H30M</button>
              <button className={selectedDuration === 180 ? "selected-button" : "unselected-button"} onClick={() => handleDurationFilter(180)}>3H</button>
            </div> 
  
            {/* Genre Filter Buttons */}
            <div className="genre-buttons-container">
              <p className="filter-label">Genre: </p>
              <button className = "no-filter-button" onClick={() => clearFilters(null)}>
                No Filter
              </button>
              {genres.map(genre => (
                <button 
                key={genre}
                className={selectedGenre === genre ? 'selected-button' : 'unselected-button'}
                onClick={() => handleGenreClick(genre)}>
                  {genre}
                </button>
              ))}
            </div>
            <br/>
            
            {/* Search Bar */}
            <SearchMoviesBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            
            {/* Button to toggle calendar visibility */}
            <div className="show-calendar-button" align="center">
              <Button onClick={toggleCalendar}>
                <CalendarTodayIcon />  {showCalendar ? ' Hide Calendar' : ' Show Calendar'}
              </Button>
            </div>
          </div>
        )}
  
        {/* Calendar component */}
        {showCalendar && (
          <div className="calendar-container" align="center">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              selectRange={false}
            />
          </div>
        )}
  
        <div className="movie-list-container">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.movieId} movie={movie} selectedCinema={selectedCinema} />
            ))
          ) : (
            // Render a message if there are no movies available
            <div className="no-movies-message">
              <p className="text-white">There are no movies available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};  

export default ListMovieComponent;
