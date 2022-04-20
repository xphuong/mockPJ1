const { DataTypes } = require('sequelize');
const now = require('moment');
const bcrypt = require('bcryptjs');
const sequelizeDB = require('../config/configDB');
const logger = require('../config/logger');

const User = sequelizeDB.define('Users', {
    userID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    // Username = email
    userName: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    passWord: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
    },
    isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: DataTypes.DATE(now()),
    updatedAt: DataTypes.DATE(now()),
});

User.beforeCreate(async (user) => {
    user.passWord = await bcrypt.hash(user.passWord, 8);
});
// Account.beforeUpdate(async (user, options) => {
//   user.passWord = await bcrypt.hash(user.passWord, 8);
// });

User.isUserAlready = async (_userName) => {
    const user = await User.findOne({ where: { userName: _userName } });
    return !!user;
};

User.prototype.isPasswordMatch = async (password) =>{
    return bcrypt.compare(password, this.password);
}

sequelizeDB
    .sync()
    .then(() => logger.info('Sync table "Users" successfully!'))
    .catch(() => logger.error('Sync table "Users" failed')); // create database table with name 'Account'

module.exports = User;
