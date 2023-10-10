

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path =require('path');
const app = express();
// const port = process.env.PORT || 3000;

app.use(cors());

const rawData = fs.readFileSync('movies_metadata.json');
const moviesData = JSON.parse(rawData);

app.get('/api/movie', (req, res) => {
  res.json(moviesData);
});

app.get('/api/movie/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  
  const movie = moviesData.find(movie => movie.id === movieId);

  if (!movie) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  res.json(movie);
});



// Express port-switching logic
let port;
console.log("❇️ NODE_ENV is", port);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
  console.log("⚠️ Not seeing your changes as you develop?");
  console.log(
    "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Start the listener!
const listener = app.listen(port, () => {
  console.log("❇️ Express server is running on port", listener.address().port);
});
