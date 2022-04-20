const { DataTypes } = require('sequelize');
const now = require('moment');
const sequelizeDB = require('../config/configDB');
const logger = require('../config/logger');

const ScoreBoard = sequelizeDB.define('Score', {
    boardID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userID: {
        type: DataTypes.INTEGER,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    playedAt: DataTypes.DATE(now())
});

sequelizeDB
    .sync()
    .then(() => logger.info('Sync score table success!'))
    .catch(() => logger.error('Sync score table fail')); // create database table with name 'Account'

module.exports = ScoreBoard;
