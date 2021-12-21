require("dotenv").config()

const conf = {};
conf.environment = process.env.ENV;
conf.sequelize = {};
conf.sequelize.username = process.env.DB_USERNAME
conf.sequelize.password = process.env.DB_PASSWORD
conf.sequelize.database = process.env.DB_DATABASE
conf.sequelize.host = process.env.DB_HOST
conf.sequelize.dialect = process.env.DB_CONNECTION;
conf.sequelize.port = process.env.DB_PORT;
conf.sequelize.define = {
  charset: 'utf8mb4', 
    dialectOptions: {
    collate: 'utf8mb4_unicode_ci'
  }
}
conf.ROUND_SALT = 8;
module.exports = conf;