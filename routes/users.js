const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { validateUser } = require('../middlewares/validate');

router.get('/users/me', getUser);
router.patch('/users/me', validateUser, updateUser);

module.exports = router;
