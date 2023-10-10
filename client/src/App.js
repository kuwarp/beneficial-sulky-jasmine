
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css"
import play from "./assets/img/img.png"
function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
 

  useEffect(() => {
    // Fetch movies based on pagination settings
    axios.get(`http://localhost:3001/api/movie`)
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  const handleMovieClick = (movieId) => {
    // Fetch a single movie by its ID when it is clicked
    axios.get(`http://localhost:3001/api/movie/${movieId}`)
      .then(response => {
        setSelectedMovie(response.data);
      })
      .catch(error => {
        console.error('Error fetching movie by ID:', error);
      });
  };


  const handleReturnToList = () => {
    // Clear the selected movie when returning to the list
    setSelectedMovie(null);
  };
  const parseCustomDate = (dateString) => {
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10) + 2000; // Assuming years below 100 refer to the 21st century

    return new Date(year, month - 1, day); // Month is 0-based in JavaScript
  };
  return (
    <div className="App">
      <h1>Movies</h1>
      {selectedMovie ? (
        // Single movie page
        
        <div className="single-movie">
           <button onClick={handleReturnToList}>Return to List</button>
        <h2>{selectedMovie.title}</h2>
        <p>Original Title: {selectedMovie.original_title}</p>
        <p>Overview: {selectedMovie.overview}</p>
        <p>Release Date: {parseCustomDate(selectedMovie.release_date).toLocaleDateString()}</p>
        <p>Runtime: {selectedMovie.runtime} minutes</p>
        <p>Status: {selectedMovie.status}</p>
        <p>Tagline: {selectedMovie.tagline}</p>
        <p>Vote Average: {selectedMovie.vote_average} out of 10</p>
        <p>Vote Count: {selectedMovie.vote_count}</p>
       
      </div>
      ) : (
        // List of movies with responsive grid layout
        <div className="movie-list">
          <h2>All Movies</h2>
          <div className="movie-grid">
            {movies.map(movie => (
              <div key={movie.id} className="movie-card">
                <button onClick={() => handleMovieClick(movie.id)}>
                <img src={play} alt=''/>
        
                  <h3>{movie.title}</h3>
                  <p>Tagline: {movie.tagline}</p>
                  <p>Vote Average: {movie.vote_average} out of 10</p>
                </button>
              </div>
            ))}
          </div>
         
                  </div>
      )}
    </div>
  );
}

export default App;
