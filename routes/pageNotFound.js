/* eslint-disable no-unused-vars */
const router = require('express').Router();
const NotFoundError = require('../errors/notFoundError');

router.use('*', (req, res) => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
