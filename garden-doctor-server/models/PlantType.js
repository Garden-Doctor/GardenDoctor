const { DataTypes } = require("sequelize");

const Model = (sequelize) => {
  return sequelize.define("PlantType", {
    //컬럼 정의
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false, //NOT NULL
      primaryKey: true,
      autoIncrement: true,
    },
    plant_type: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  });
};

module.exports = Model;
