const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');


const createUser = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['userName', 'role']);
    const options = pick(req.query, ['sortBy', 'order', 'size', 'page']);
    await userService.queryUsers(filter, options, res);
});

const getUser = catchAsync(async (req, res) => {
    const user = await userService.getUserByPk(req.params.userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
    const user = await userService.updateUserByPk(req.params.userId, req.body);
    res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
    await userService.deleteUserByPk(req.params.userId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
};

