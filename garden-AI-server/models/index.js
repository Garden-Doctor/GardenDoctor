"use strict";

import Sequelize from "sequelize";
const env = process.env.NODE_ENV || "development";
import configenv from "../config/config.json" assert { type: "json" };
import Chats from "./Chats.js";
import User from "./User.js";

const db = {};
const config = configenv[env];
console.log("config", config);
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

//모델
db.Chats = Chats(sequelize, Sequelize);
db.User = User(sequelize, Sequelize);

// 사용자와 채팅 관계 설정
db.User.hasMany(db.Chats, { foreignKey: "userId" });
db.Chats.belongsTo(db.User, { foreignKey: "userId" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
