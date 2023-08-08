const SUCCESS_STATUS = 200;
const CREATED_STATUS = 201;
const SECRET_KEY = 'some-secret-key';

const regex = /^https?:\/\/(www\.)?[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=]+#?$/;

module.exports = {
  SUCCESS_STATUS,
  CREATED_STATUS,
  SECRET_KEY,
  regex,
};
