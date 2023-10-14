const { DataTypes } = require("sequelize");

const Model = (sequelize) => {
  return sequelize.define("gardenUsers", {
    //컬럼 정의
    id: {
      type: DataTypes.INTEGER,
      allowNull: false, //NOT NULL
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    userid: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    pw: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  });
};

module.exports = Model;
