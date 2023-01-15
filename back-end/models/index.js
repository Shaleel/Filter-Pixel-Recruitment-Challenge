"use strict";

const Sequelize = require("sequelize");
const config = require("../config/config.json");

const db = {};

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    port: config.development.port,
    host: config.development.host,
    dialect: config.development.dialect,
    logging: false,
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);

module.exports = db;
