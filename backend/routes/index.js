const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createUser, login } = require('../controllers/users');
const { regex } = require('../utils/constants');
const auth = require('../middlewares/auth');
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

// Авторизация и роуты, которым авторизация нужна
router.use(auth);

router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);
router.get('/signout', (_req, res) => res.clearCookie('jwt').send({ message: 'Выполнен выход.' }));

router.use('*', (_req, _res, next) => next(new NotFoundError('Такой страницы не существует.')));

module.exports = router;
