const Movie = require('../models/movies');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/fobiddenError');

const getMovie = (req, res, next) => {
  Movie.find({})
    .then((data) => res.status(200).send(data))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    description,
    duration,
    nameRU,
    nameEN,
    year,
    thumbnail,
    trailer,
    image,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    description,
    duration,
    nameRU,
    nameEN,
    year,
    thumbnail,
    trailer,
    image,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы неверные данные');
      }
      return next(err);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const id = req.params.movieId;
  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Нет фильма с таким id');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нет прав для удаления карточки');
      }
      return movie.remove(id)
        .then((deleted) => {
          res.send(deleted);
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'ObjectId') {
        throw new BadRequestError('Переданы неверные данные');
      }
      return next(err);
    })
    .catch(next);
};

module.exports = { getMovie, createMovie, deleteMovie };
