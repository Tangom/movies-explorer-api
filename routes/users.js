const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getCurrentUsersId, getUsersId, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUsersId);

router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().required().length(24)
      .hex(),
  }),
}), getUsersId);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    about: Joi.string().min(3).max(30).required(),
  }).unknown(true),
}), updateProfile);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(new RegExp('^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w\\W.-]*)#?$')),
  }),
}), updateAvatar);

module.exports = router;
