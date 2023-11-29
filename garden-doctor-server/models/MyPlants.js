const { DataTypes } = require("sequelize");

const Model = (sequelize) => {
  return sequelize.define("MyPlants", {
    //컬럼 정의
    myPlant_id: {
      type: DataTypes.INTEGER,
      allowNull: false, //NOT NULL
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    plant_nickname: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    plant_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    plant_img: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });
};

module.exports = Model;
