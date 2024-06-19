const { Sequelize } = require('sequelize');
const config = require('./config.json');

const env = process.env.NODE_ENV || 'development';
const { username, password, database, host, dialect, logging, timezone } = config[env];

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  logging: logging,
  timezone: timezone,
});

module.exports = sequelize;
