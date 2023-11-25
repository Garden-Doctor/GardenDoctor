const { DataTypes } = require("sequelize");

const Model = (sequelize) => {
  return sequelize.define("plants", {
    //컬럼 정의
    plantId: {
      type: DataTypes.INTEGER,
      allowNull: false, //NOT NULL
      primaryKey: true,
      autoIncrement: true,
    },
    plantType: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    plantNicknname: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    plant_img: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });
};

module.exports = Model;
