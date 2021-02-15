const BadRequestError = require('../errors/badRequestError');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.kind === 'ObjectId') {
    throw new BadRequestError('Неверно переданы данные');
  } else {
    res.status(statusCode).send({
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    });
  }
  next();
};

module.exports = errorHandler;
