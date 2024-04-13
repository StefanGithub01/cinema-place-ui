import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { listMovies, deleteMovie } from '../../services/MovieService';
import EditMovieForm from './EditMovie';
import '../css/AdminPanel.css';
import { Button } from 'primereact/button';

const ViewMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await listMovies();
      setMovies(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (movieId) => {
    try {
      console.log("Delete Movie Id:", movieId);
      await deleteMovie(movieId);
      alert('Movie Deleted Successfully!');
      fetchMovies();
    } catch (error) {
      console.error('Something went wrong...', error);
      alert('Something went wrong...');
    }
  };

  const handleEdit = (movieId) => {
    const selectedMovie = movies.find(movie => movie.movieId === movieId);
    setSelectedMovie(selectedMovie);
    console.log("selectedMovie", selectedMovie );
  };

  const cancelEdit = () => {
    setSelectedMovie(null);
  };

  const cinemasTemplate = (rowData) => {
    return rowData.cinemas.map((cinema) => cinema.name).join(', ');
  };


  const deleteButtonTemplate = (rowData) => {
    return (
      <Button label="Delete" className="p-button-danger cancel-buttonAdmin" onClick={() => handleDelete(rowData.movieId)} />
    );
  };

  const editButtonTemplate = (rowData) => {
    return (
      <Button label="Edit" className="p-button-primary buttonAdmin" onClick={() => handleEdit(rowData.movieId)} />
    );
  };

  const handleMovieUpdated = () => {
    fetchMovies(); // Fetch updated movie list after a movie is updated
  };
  
  const imageTemplate = (rowData) => {
    return (
      <img src={rowData.posterImageUrl} alt={rowData.title} style={{ width: '80px', height: '125px' }} />
    );
  };

  const formatDuration = (duration) => {
    const regex = /PT(\d+)H(\d+)M/;
    const match = regex.exec(duration);
    if (match) {
      const hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      return `${hours}h${minutes}m`;
    }
    return duration;
  };
  

  const actorsTemplate = (rowData) => {
    const maxActors = 1; // Maximum number of actors to display
    const actors = rowData.actors.slice(0, maxActors).map((actor) => actor.firstName + ' ' + actor.lastName);
    const additionalActors = rowData.actors.length > maxActors ? ` (+${rowData.actors.length - maxActors} more)` : '';
  
    return (
      <span title={rowData.actors.map((actor) => actor.firstName + ' ' + actor.lastName).join(', ')} style={{maxWidth: '200px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', display: 'inline-block' }}>
        {actors.join(', ')}
        {additionalActors}
      </span>
    );
  };

  const descriptionTemplate = (rowData) => {
    const maxLength = 30; // Maximum number of characters to display
    const description = rowData.description && rowData.description.length > maxLength ?
      `${rowData.description.substring(0, maxLength)}...` :
      rowData.description;
    
    return (
      <span title={rowData.description} className="p-d-inline-block" style={{ maxWidth: '200px', overflow: 'hidden', whiteSpace: 'nowrap'}}>
        {description}
      </span>
    );
  };
  

  return (
    <div className="p-d-flex p-flex-column p-ai-center">
      {loading && <p>Loading...</p>}
      <h2 className="text-white" style={{textAlign: 'center'}}>View Movies:</h2>
      <br/>
      {error && <p>Error: {error}</p>}
      {!selectedMovie ? (
        <div className="p-datatable-custom">
          <DataTable value={movies} sortMode="multiple" className="p-datatable-striped">
            <Column field="posterImageUrl" header="Poster" body={imageTemplate} style={{ textAlign: 'center' }} />
            <Column field="movieId" header="ID" className="text-white" sortable style={{ width: '10%' }} />
            <Column field="title" header="Title" className="text-white" sortable style={{ width: '30%' }} />
            <Column field="releaseDate" header="Release Date" className="text-white" sortable style={{ width: '20%' }} />
            <Column field="director" header="Director" className="text-white" sortable style={{ width: '20%' }} />
            <Column field="genre" header="Genre" className="text-white" sortable style={{ width: '20%' }} />
            <Column field="rated" header="Rated" className="text-white" sortable style={{ width: '20%' }} />
            <Column field="actors" header="Actors" body={actorsTemplate} className="text-white" sortable style={{ width: '20%' }} />
            <Column field="cinemas" header="Cinemas" body={cinemasTemplate} className="text-white" sortable style={{ width: '20%' }} />
            <Column field="imdbMovieId" header="ImdbId" className="text-white" sortable style={{ width: '20%' }} />
            <Column field="duration" header="Duration" className="text-white" sortable style={{ width: '20%' }} body={(rowData) => formatDuration(rowData.duration)} />
            <Column header="Description" body={descriptionTemplate} style={{ textAlign: 'center', width: '20%' }} />
            <Column header="Actions" body={deleteButtonTemplate} style={{ textAlign: 'center', width: '10%' }} />
            <Column header="Actions" body={editButtonTemplate} style={{ textAlign: 'center', width: '10%' }} />
          </DataTable>
        </div>
      ) : (
        <EditMovieForm
        movie={selectedMovie}
        movieId={selectedMovie.movieId}
        cancelEdit={cancelEdit}
        onMovieUpdated={handleMovieUpdated} // Pass the callback function
      />
      )}
    </div>
  );
};

export default ViewMovies;

