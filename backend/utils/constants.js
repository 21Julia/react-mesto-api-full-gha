const rateLimit = require('express-rate-limit');

const CREATED_STATUS = 201;
const SECRET_KEY = 'some-secret-key';

const regex = /^https?:\/\/(www\.)?[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=]+#?$/;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = {
  CREATED_STATUS,
  SECRET_KEY,
  regex,
  limiter,
};
