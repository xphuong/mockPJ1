const Joi = require('joi');
const { password } = require('./custom.validation');


const createUser = {
  body: Joi.object().keys({
    userName: Joi.string().required().email(),
    passWord: Joi.string().required().custom(password),
    score: Joi.number().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};


const getUsers = {
  query: Joi.object().keys({
    userName: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    order: Joi.string(),
    size: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};


const getUser = {
  params: Joi.object().keys({
    userId: Joi.number(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.number(),
  }),
  body: Joi.object()
      .keys({
        email: Joi.string().email(),
        password: Joi.string().custom(password),
        name: Joi.string(),
      })
      .min(1),
};


const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.number(),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
