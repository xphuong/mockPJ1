const Joi = require('joi');

const submitQuestion = {
  body: Joi.object().keys({
    questionID: Joi.array(),
    correct: Joi.array(),
  }),
};

module.exports = {
  submitQuestion
};
