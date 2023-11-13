const { DataTypes } = require("sequelize");

const Model = (sequelize) => {
  return sequelize.define("comments", {
    //컬럼 정의
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false, //NOT NULL
      primaryKey: true,
      autoIncrement: true,
    },
    commentText: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
  });
};

module.exports = Model;
