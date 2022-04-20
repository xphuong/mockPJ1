const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const tokenService = require('./token.service');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const {tokenTypes} = require('../config/tokens');
const {JWT} = require('../models');

/**
 *
 * @param password
 * @param truePassword
 * @returns {Promise<*>}
 */
const checkPassword = async (password, truePassword) => {
    return bcrypt.compare(password, truePassword);
};

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
    const user = await userService.getUserByEmail(email);
    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email');
    }
    if (!(await checkPassword(password, user.passWord))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
    }
    return user;
};

/**
 *
 * @param username
 * @param password
 * @returns {Promise<*>}
 */
const loginUserNameAndPassword = async (username, password) => {
    const user = await userService.getUserByUsername(username);
    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect username');
    }
    const isPasswordMatch = await checkPassword(password, user.passWord);
    if (!isPasswordMatch) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
    }
    return user;
};

/**
 *
 * @param refreshToken
 * @returns {Promise<void>}
 */
const logout = async (refreshToken) => {
    const refreshTokenDoc = await JWT.findOne({where: {token: refreshToken, type: tokenTypes.REFRESH}});
    if (!refreshTokenDoc) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
    }
    await refreshTokenDoc.destroy();
};

/**
 *
 * @param refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
    try {
        const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
        const user = await userService.getUserByPk(refreshTokenDoc.userID);
        if (!user) {
            throw new Error();
        }
        await refreshTokenDoc.destroy();
        return tokenService.generateAuthTokens(user);
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }
};


/**
 *
 * @param resetPasswordToken
 * @param newPassword
 * @returns {Promise<void>}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
    try {
        const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
        const user = await userService.getUserByPk(resetPasswordTokenDoc.userID);
        if (!user) {
            throw new Error();
        }
        await userService.updateUserByPk(user.userID, {passWord: newPassword});
        await JWT.destroy({where: {userID: user.userID, type: tokenTypes.RESET_PASSWORD}});
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
    }
};

/**
 *
 * @param verifyEmailToken
 * @returns {Promise<void>}
 */
const verifyEmail = async (verifyEmailToken) => {
    try {
        const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
        const user = await userService.getUserByPk(verifyEmailTokenDoc.userID);
        if (!user) {
            throw new Error();
        }
        await JWT.destroy({where: {userID: user.userID, type: tokenTypes.VERIFY_EMAIL}});
        await userService.updateUserByPk(user.userID, {isEmailVerified: true});
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
    }
};

module.exports = {
    loginUserWithEmailAndPassword,
    loginUserNameAndPassword,
    logout,
    refreshAuth,
    resetPassword,
    verifyEmail,
};
