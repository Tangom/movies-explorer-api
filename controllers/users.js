const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const NoAuthorizationError = require('../errors/noAuthorizationError');
const ConflictRequestError = require('../errors/сonflictRequestError');
const { JWT_SECRET } = require('../config');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      // ошибка аутентификации
      throw new NoAuthorizationError(err.message);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))

    .catch(next);
};

const updateUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      } else {
        res.status(200).send({
          email: req.body.email,
          name: req.body.name,
        });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы неверные данные');
      }
      return next(err);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => {
      res.status(200).send({
        name: user.name,
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы неверные данные');
      }
      if (err.code === 11000) {
        throw new ConflictRequestError(`Пользователь с email: ${req.body.email} уже существует`);
      }
      return next(err);
    })
    .catch(next);
};

module.exports = {
  login, getUser, updateUser, createUser,
};
