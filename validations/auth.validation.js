const Joi = require('joi');
const { password } = require('./custom.validation');


const register = {
  body: Joi.object().keys({
    userName: Joi.string().required().email(),
    passWord: Joi.string().required().custom(password),
  }),
};


const login = {
  body: Joi.object().keys({
    userName: Joi.string().required(),
    passWord: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};


const forgotPassword = {
  body: Joi.object().keys({
    userName: Joi.string().email().required(),
  }),
};


const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    passWord: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
