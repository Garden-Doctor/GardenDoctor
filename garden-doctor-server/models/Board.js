const { DataTypes } = require("sequelize");

const Model = (sequelize) => {
  return sequelize.define("Boards", {
    //컬럼 정의
    boardId: {
      type: DataTypes.INTEGER,
      allowNull: false, //NOT NULL
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
  });
};

module.exports = Model;
