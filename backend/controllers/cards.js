const mongoose = require('mongoose');

const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const { CREATED_STATUS } = require('../utils/constants');

module.exports.getCards = (_req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  Card.create({ name, link, owner: ownerId })
    .then((newCard) => res.status(CREATED_STATUS).send(newCard))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Ошибка! Не удалось создать новую карточку.'));
      }
      return next(err);
    });
};

module.exports.deleteById = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;

  Card.checkCardOwner(cardId, userId)
    .then((card) => Card.findByIdAndRemove(card._id, { new: true }))
    .then(() => res.send({ message: 'Пост удален.' }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Ошибка при удалении карточки! Переданы некорректные данные.'));
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Ошибка при удалении карточки! Данной карточки нет в базе.'));
      }
      return next(err);
    });
};

module.exports.addLike = (req, res, next) => {
  const owner = req.user._id;

  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: owner } }, { new: true })
    .orFail(() => new NotFoundError('Ошибка при добавлении лайка! Данной карточки нет в базе.'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Ошибка при добавлении лайка! Переданы некорректные данные.'));
      }
      return next(err);
    });
};

module.exports.deleteLike = (req, res, next) => {
  const owner = req.user._id;

  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: owner } }, { new: true })
    .orFail(() => new NotFoundError('Ошибка при удалении лайка! Данной карточки нет в базе.'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Ошибка при удалении лайка! Переданы некорректные данные.'));
      }
      return next(err);
    });
};
