const mongoose = require('mongoose');
const validator = require('validator');

const DoNotHavePermissionError = require('../errors/DoNotHavePermissionError');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Invalid Link',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

cardSchema.statics.checkCardOwner = function (cardId, userId) {
  return this.findById(cardId)
    .orFail()
    .then((card) => {
      const cardOwner = card.owner.toString();
      const matched = cardOwner === userId;

      if (!matched) {
        return Promise.reject(new DoNotHavePermissionError('У вас недостаточно прав для данного действия.'));
      }
      return card;
    });
};

module.exports = mongoose.model('card', cardSchema);
