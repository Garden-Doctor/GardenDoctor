"use strict";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "test";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

//모델
db.Plantsolution = require("./Plantsolution")(sequelize);

//모델12
db.User = require("./User")(sequelize);

//모델
db.Board = require("./Board")(sequelize);

//모델
db.Comment = require("./Comment")(sequelize);

//모델
db.Like = require("./Like")(sequelize);

db.MyPlants = require("./MyPlants")(sequelize);

db.PlantType = require("./PlantType")(sequelize);

// 사용자와 게시글 관계 설정
db.User.hasMany(db.Board, { foreignKey: "userId" });
db.Board.belongsTo(db.User, { foreignKey: "userId" });

// 사용자와 댓글 관계 설정
db.User.hasMany(db.Comment, { foreignKey: "userId" });
db.Comment.belongsTo(db.User, { foreignKey: "userId" });
// 게시물와 댓글 관계 설정
db.Board.hasMany(db.Comment, { foreignKey: "boardId" });
db.Comment.belongsTo(db.Board, { foreignKey: "boardId" });

// 사용자와 댓글 관계 설정
db.User.hasMany(db.Like, { foreignKey: "userId" });
db.Like.belongsTo(db.User, { foreignKey: "userId" });
// 게시물와 댓글 관계 설정
db.Board.hasMany(db.Like, { foreignKey: "boardId" });
db.Like.belongsTo(db.Board, { foreignKey: "boardId" });

//사용자와 식물 관계 설정(다대다)
db.MyPlants.belongsToMany(db.PlantType, { through: "myPlantsTypes" });
db.PlantType.belongsToMany(db.MyPlants, { through: "myPlantsTypes" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
