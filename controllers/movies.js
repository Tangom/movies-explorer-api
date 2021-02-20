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

// const likeMovie = (req, res, next) => {
//   const userId = req.user._id;
//   User.findById(userId)
//     .then((user) => {
//       Movie.findByIdAndUpdate(
//         { _id: req.params.cardId },
//         { $addToSet: { likes: user.id } },
//         { new: true },
//       )
//         .then((card) => {
//           if (!card) {
//             res.status(404).send({ message: 'Нет данных' });
//           }
//           res.status(200).send(card);
//         })
//         .catch((err) => {
//           if (err.name === 'CastError') {
//             res.status(400).send({ message: 'Переданы неверные данные' });
//           }
//           return next(err);
//         })
//         .catch(next);
//     });
// };
//
// const dislikeMovie = (req, res, next) => {
//   const userId = req.user._id;
//   User.findById(userId)
//     .then((user) => {
//       Movie.findByIdAndUpdate(
//         { _id: req.params.cardId },
//         { $pull: { likes: user._id } },
//         { new: true },
//       )
//         .then((card) => {
//           if (!card) {
//             res.status(404).send({ message: 'Нет данных' });
//           }
//           res.status(200).send(card);
//         })
//         .catch((err) => {
//           if (err.name === 'CastError') {
//             res.status(400).send({ message: 'Переданы неверные данные' });
//           }
//           return next(err);
//         })
//         .catch(next);
//     });

module.exports = { getMovie, createMovie, deleteMovie };
