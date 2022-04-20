const Joi = require('joi');

const createQuestion = {
  body: Joi.object().keys({
    content: Joi.string(),
    answer1: Joi.string(),
    answer2: Joi.string(),
    answer3: Joi.string(),
    answer4: Joi.string(),
    correct: Joi.number(),
  }),
};

const getQuestion = {
  params: Joi.object().keys({
    questionID: Joi.number(),
  }),
};

const updateQuestion = {
  params: Joi.object().keys({
    questionID: Joi.number(),
  }),
};

const deleteQuestion = {
  params: Joi.object().keys({
    questionID: Joi.number(),
  }),
};

module.exports = {
  createQuestion,
  deleteQuestion,
  getQuestion,
  updateQuestion
};
