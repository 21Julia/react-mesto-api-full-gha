const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  getAllUsers, getUserById, getCurrentUser, updateProfile, updateProfileAvatar,
} = require('../controllers/users');
const { regex } = require('../utils/constants');

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().alphanum().hex()
      .length(24),
  }),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regex),
  }),
}), updateProfileAvatar);

module.exports = router;
