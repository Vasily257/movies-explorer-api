const { Movie } = require('../models/userModel');

const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

const {
  CREATING_MOVIE_ERROR_TEXT,
  MISSING_MOVIE_ID_ERROR_TEXT,
  DELETING_CARD_ERROR_TEXT,
  INCORRECT_MOVIE_ID_ERROR_TEXT,
} = require('../utils/constants');
const { handlesuccessfulСreation } = require('../utils/utils');

module.exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({}).sort({ nameRU: -1 });
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

module.exports.createMovie = async (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  try {
    const movie = Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
    });

    handlesuccessfulСreation(res, movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(CREATING_MOVIE_ERROR_TEXT));
      return;
    }

    next(err);
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  const movieId = req.params.id;
  const currentUser = req.user._id;

  try {
    const movie = await Movie.findById(movieId).orFail(() => {
      throw new NotFoundError(MISSING_MOVIE_ID_ERROR_TEXT);
    });

    if (movie.owner.toString() !== currentUser) {
      throw new ForbiddenError(DELETING_CARD_ERROR_TEXT);
    } else {
      await movie.delete();
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError(INCORRECT_MOVIE_ID_ERROR_TEXT));
      return;
    }

    next(err);
  }
};
