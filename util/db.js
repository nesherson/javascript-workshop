const Sequelize = require('sequelize');

const connection = new Sequelize('node_complete', 'root', '27NESH1996king', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = connection;
