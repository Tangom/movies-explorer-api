const router = require('express').Router();
const { validateMovie, validateDeleteMovie } = require('../middlewares/validate');
const {
  getMovie, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovie);
router.post('/movies', validateMovie, createMovie);
router.delete('/movies/movieId', validateDeleteMovie, deleteMovie);
// router.put('/movies/:movieId/likes', likeMovies);
// router.delete('/movies/:movieId/likes', dislikeMovies);

// router.put('/movies/:movieId/likes', celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().alphanum().required().length(24)
//       .hex(),
//   }),
// }), likeMovies);
//
// router.delete('/movies/:movieId/likes', celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().alphanum().required().length(24)
//       .hex(),
//   }),
// }), dislikeMovies);

module.exports = router;
