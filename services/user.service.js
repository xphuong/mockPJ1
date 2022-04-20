const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const paginationService = require('./pagination.service');
const ApiError = require('../utils/ApiError');

/**
 *
 * @param userBody
 * @returns {Promise<CreateOptions<Attributes<Model>> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<any, TModelAttributes>>}
 */
const createUser = async (userBody) => {
  if (await User.isUserAlready(userBody.userName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');
  }
  return User.create({ ...userBody });
};

/**
 *
 * @param filter
 * @param options
 * @param res
 * @returns {Promise<void>}
 */
const queryUsers = async (filter, options, res) => {
  const page = parseInt(options.page, 10);
  const size = parseInt(options.size, 10);
  const { limit, offset } = paginationService.getPagination(page, size);
  User.findAndCountAll({ where: filter, limit, offset, order: [[options.sortBy, options.order]] })
    .then((data) => {
      const result = paginationService.getPagingData(data, page, limit);
      res.send(result);
    })
    .catch(() => {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Something wrong when get users');
    });
};

/**
 * Get user by id
 * @param id
 * @returns {Promise<User>}
 */
const getUserByPk = async (id) => {
  return User.findByPk(id);
};

/**
 *
 * @param email
 * @returns {Promise<*>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Get user by user name
 */
const getUserByUsername = async (_username) => {
  return User.findOne({ where: { userName: _username } });
};

/**
 * @param _password
 * @returns {Promise<*>}
 */
const hashPassword = async (_password) => {
  return bcrypt.hash(_password, 8);
};
/**
 *
 * @param userId
 * @param updateBody
 * @returns {Promise<User>}
 */
const updateUserByPk = async (userId, updateBody) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.userName && (await User.isUserAlready(updateBody.userName))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  if (updateBody.passWord) {
    // need update password
    // eslint-disable-next-line no-param-reassign
    updateBody.passWord = await hashPassword(updateBody.passWord);
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 *
 * @param userId
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
const deleteUserByPk = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.destroy();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserByPk,
  getUserByEmail,
  getUserByUsername,
  updateUserByPk,
  deleteUserByPk,
};
