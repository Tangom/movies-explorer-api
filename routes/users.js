const router = require('express').Router();
const { getUsers, getCurrentUser, updateUser } = require('../controllers/users');
const { validateUser } = require('../middlewares/validate');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.patch('/users/me', validateUser, updateUser);

module.exports = router;
