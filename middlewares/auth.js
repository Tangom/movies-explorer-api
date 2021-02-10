const jwt = require('jsonwebtoken');
const NoAuthorizationError = require('../errors/noAuthorizationError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NoAuthorizationError('Необходима авторизация');
  }

  /* убираем 'Bearer ' в токене */
  const YOUR_JWT = authorization.replace('Bearer ', '');
  let payload;

  try {
    /* метод verify проверяет, что токен верный и возвращает payload
    пользователя (_id) */
    payload = jwt.verify(YOUR_JWT, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new NoAuthorizationError('Необходима авторизация');
  }

  req.user = payload;
  next(); // пропускаем запрос дальше
};
