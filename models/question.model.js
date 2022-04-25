const { DataTypes } = require('sequelize');
const now = require('moment');
const sequelizeDB = require('../config/configDB');
const logger = require('../config/logger');

const Question = sequelizeDB.define('Question', {
    questionID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    answer1: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    answer2: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    answer3: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    answer4: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    correct: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: DataTypes.DATE(now()),
    updatedAt: DataTypes.DATE(now()),
});

sequelizeDB
    .sync()
    .then(() => logger.info('Sync Question Table success!'))
    .catch(() => logger.error('Sync Question Table fail')); // create database table with name 'Account'

module.exports = Question;
