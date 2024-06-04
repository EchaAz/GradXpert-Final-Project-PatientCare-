const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const config = require('./config/config.json');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

let sequelize;

if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable], {
    dialect: dbConfig.dialect
  });
} else {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      dialect: dbConfig.dialect
    }
  );
}

module.exports = sequelize;
