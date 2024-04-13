import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMoviesForActor } from '../services/MovieService';
import "./css/ListActors_Style.css"; // Import your CSS file
import { Paper, Button } from "@mui/material";

const ActorMoviesComponent = () => {
    const { actorId } = useParams(); // Get the actorId from the route parameter
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Fetch movies for the actor
        getMoviesForActor(actorId)
            .then(response => {
                console.log(response.data);
                setMovies(response.data);
            })
            .catch(error => {
                console.error('Error fetching actor movies:', error);
            });
    }, [actorId]); // Fetch movies whenever actorId changes

    // Function to format date
    const formatDate = (dateString) => {
        // Implement your date formatting logic here
        return dateString;
    };

    return (
        <div>
            <br/><br/><br/><br/>
            <h2 className='white'>Cast in: </h2>

            {/* Iterate over the movies array and render each movie card */}
            {movies.map(movie => (
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
                            </div>
                        </div>
                    </div>
                </Paper>
            ))}
        </div>
    );
};

export default ActorMoviesComponent;
