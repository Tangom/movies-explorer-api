const router = require('express').Router();
const { validateMovie, validateDeleteMovie } = require('../middlewares/validate');
const {
  getMovie, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovie);
router.post('/movies', validateMovie, createMovie);
router.delete('/movies/:movieId', validateDeleteMovie, deleteMovie);

module.exports = router;
