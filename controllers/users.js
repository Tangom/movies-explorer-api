const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
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
  User.findById(req.user._id)
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findById(req.user._id)
    // eslint-disable-next-line consistent-return
    .then((foundUser) => {
      if (foundUser._id.toString() === req.user._id) {
        return User.findByIdAndUpdate(
          req.user._id,
          { name, email },
          {
            new: true,
            runValidators: true,
          },
        )
          .then((user) => { res.send({ user }); });
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

// const updateUser = (req, res, next) => {
//   const id = req.user._id;
//   const { email, name } = req.body;
//   User.findOneAndUpdate(id, { email, name }, { new: true })
//     .then((user) => res.status(200).send(user))
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         throw new BadRequestError('Переданы неверные данные');
//       }
//       return next(err);
//     })
//     .catch(next);
// };

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
