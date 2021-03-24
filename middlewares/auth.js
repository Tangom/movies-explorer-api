const jwt = require('jsonwebtoken');
const NoAuthorizationError = require('../errors/noAuthorizationError');
const { JWT_SECRET } = require('../config');

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
    payload = jwt.verify(YOUR_JWT, JWT_SECRET);
  } catch (err) {
    throw new NoAuthorizationError('Необходима авторизация');
  }

  req.user = payload;
  next(); // пропускаем запрос дальше
};