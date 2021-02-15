const router = require('express').Router();
const NotFoundError = require('../errors/notFoundError');

router.all('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
