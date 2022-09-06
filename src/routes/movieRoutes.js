const express = require('express');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movieControllers');

const movieRoutes = express.Router();

movieRoutes.get('/', getMovies);
movieRoutes.post('/', createMovie);
movieRoutes.delete('/:id', deleteMovie);

module.exports = { movieRoutes };
