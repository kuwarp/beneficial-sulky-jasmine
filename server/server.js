// const express = require("express");
// const path = require("path");
// // const fs= require('fs')
// const fs =require("fs")
// const cors=require('cors')
// const app = express();
// app.use(cors())
// const rawData = fs.readFileSync('movies_metadata.json');
// const moviesData = JSON.parse(rawData);

// app.get('/',(req,res)=>{
// //    res.send('hello')
//    res.json(moviesData)
// })
// // A test route to make sure the server is up.
// app.get("/api/ping", (request, response) => {
//   console.log("❇️ Received GET request to /api/ping");
//   response.send("pong!");
// });

// // A mock route to return some data.
// app.get("/api/movies", (request, response) => {
//   console.log("❇️ Received GET request to /api/movies");
//   response.json({ data: [{ id: 1, name: '1' }, { id: 2, name: '2' }] });
// });



const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
// const port = process.env.PORT || 3000;

app.use(cors());

const rawData = fs.readFileSync('movies_metadata.json');
const moviesData = JSON.parse(rawData);

app.get('/api/movie', (req, res) => {
  res.json(moviesData);
});

// Define an endpoint to get a movie by ID
app.get('/api/movie/:id', (req, res) => {
  const movieId = parseInt(req.params.id); // Parse the movie ID from the URL parameter
  const movie = moviesData.find(movie => movie.id === movieId);

  if (!movie) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  res.json(movie);
});



// Express port-switching logic
let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
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
