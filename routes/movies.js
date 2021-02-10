const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies, postMovies, deleteMovies, likeMovies, dislikeMovies,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', celebrate({
  body: Joi.object().required().keys({
    link: Joi.string().required().pattern(new RegExp('^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w\\W.-]*)#?$')),
    name: Joi.string().required().min(2).max(30),
  }),
}), postMovies);

router.delete('/movies/movieId ', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().required().length(24)
      .hex(),
  }),
}), deleteMovies);

router.put('/movies/:movieId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().required().length(24)
      .hex(),
  }),
}), likeMovies);

router.delete('/movies/:movieId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().required().length(24)
      .hex(),
  }),
}), dislikeMovies);

module.exports = router;
