"use strict";

import Sequelize from "sequelize";
const env = process.env.NODE_ENV || "development";
import configenv from "../config/config.json" assert { type: "json" };
import { User } from "./User.js";
const db = {};
const config = configenv[env];
console.log("config", config);
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Models
db.User = sequelize;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default { db };
