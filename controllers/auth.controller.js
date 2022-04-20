const httpStatus = require('http-status');
const Console = require("console");
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');



const register = catchAsync(async (req, res) => {
    Console.log('register');
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send({ user });
});

const login = catchAsync(async (req, res) => {
    Console.log('login');
    const { userName, passWord } = req.body;
    const user = await authService.loginUserNameAndPassword(userName, passWord);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
    await authService.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
    const tokens = await authService.refreshAuth(req.body.refreshToken);
    res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.userName);
    await emailService.sendResetPasswordEmail(req.body.userName, resetPasswordToken);
    res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
    await authService.resetPassword(req.query.token, req.body.passWord);
    res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
    await emailService.sendVerificationEmail(req.user.userName, verifyEmailToken);
    res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
    await authService.verifyEmail(req.query.token);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    register,
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword,
    sendVerificationEmail,
    verifyEmail
};
