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
    title: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING(10000),
      allowNull: false,
    },
    img: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    plant_id: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  });
};

module.exports = Model;
