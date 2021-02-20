const router = require('express').Router();
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const pageNotFound = require('./pageNotFound');
const { createUser, login } = require('../controllers/users');
const { validateSignup, validateSignin } = require('../middlewares/validate');

router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, login);

router.use('/', auth, usersRouter);
router.use('/', auth, moviesRouter);
router.use('/', pageNotFound);

module.exports = router;
