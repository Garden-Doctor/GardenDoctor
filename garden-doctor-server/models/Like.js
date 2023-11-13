const { DataTypes } = require("sequelize");

const Model = (sequelize) => {
  return sequelize.define("Likes", {
    //컬럼 정의
    likeId: {
      type: DataTypes.INTEGER,
      allowNull: false, //NOT NULL
      primaryKey: true,
      autoIncrement: true,
    },
  });
};

module.exports = Model;
