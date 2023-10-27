
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css"
import play from "./assets/img/img.png"
function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
 

  useEffect(() => {
    axios.get(`https://sulky.onrender.com/api/movie`)
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('fetching abort:', error);
      });
  }, []);

  const handleMovieClick = (movieId) => {
    axios.get(`https://sulky.onrender.com/api/movie/${movieId}`)
      .then(response => {
        setSelectedMovie(response.data);
      })
      .catch(error => {
        console.error('Aborting fetching movie by ID:', error);
      });
  };


  const handleReturnToList = () => {
    setSelectedMovie(null);
  };
  const parseCustomDate = (dateString) => {
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10) + 2000;
    return new Date(year, month - 1, day); };
  return (
    <div className="App">
     
      {selectedMovie ? (
       
       // Single page pannel
        
        <div className="movie">
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
      //  All movie Pannel
       <div className="list">
          <h2>Sulky-jasmine</h2>
          <div className="grid">
            {movies.map(movie => (
              <div key={movie.id} className="card">
                <button onClick={() => handleMovieClick(movie.id)}>
                <img src={play} alt=''/>
        
                  <h3>{movie.title}</h3>
                  <p>Tagline: {movie.tagline}</p>
                  <p>Vote Average: {movie.vote_average} / 10</p>
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
