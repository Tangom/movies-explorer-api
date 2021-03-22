const router = require('express').Router();
const { getUser, getCurrentUser, updateUser } = require('../controllers/users');
const { validateUser } = require('../middlewares/validate');

router.get('/users/me', getUser);
router.get('/users/me', getCurrentUser);
router.patch('/users/me', validateUser, updateUser);

module.exports = router;
