const Movie = require('../models/movies');
const User = require('../models/user');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/fobiddenError');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((data) => res.status(200).send(data))
    .catch(next);
};

const postMovies = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Movie.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы неверные данные');
      }
      return next(err);
    });
};

const deleteMovies = (req, res, next) => {
  const id = req.params.cardId;
  Movie.findById(id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нет прав для удаления карточки');
      } else {
        Movie.findByIdAndDelete(id)
          .then((deleted) => {
            res.status(200).send(deleted);
          })
          .catch(next);
      }
    })
    .catch(next);
};

const likeMovies = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      Movie.findByIdAndUpdate(
        { _id: req.params.cardId },
        { $addToSet: { likes: user.id } },
        { new: true },
      )
        .then((card) => {
          if (!card) {
            res.status(404).send({ message: 'Нет данных' });
          }
          res.status(200).send(card);
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            res.status(400).send({ message: 'Переданы неверные данные' });
          }
          return next(err);
        })
        .catch(next);
    });
};

const dislikeMovies = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      Movie.findByIdAndUpdate(
        { _id: req.params.cardId },
        { $pull: { likes: user._id } },
        { new: true },
      )
        .then((card) => {
          if (!card) {
            res.status(404).send({ message: 'Нет данных' });
          }
          res.status(200).send(card);
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            res.status(400).send({ message: 'Переданы неверные данные' });
          }
          return next(err);
        })
        .catch(next);
    });
};

module.exports = {
  getMovies, postMovies, deleteMovies, likeMovies, dislikeMovies,
};
