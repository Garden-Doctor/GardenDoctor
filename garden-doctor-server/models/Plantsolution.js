const { DataTypes } = require("sequelize");

const Model = (sequelize) => {
  return sequelize.define("Plantsolution", {
    num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    dignose: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    explanation: {
      type: DataTypes.STRING(255),
    },
    solution: {
      type: DataTypes.STRING(255),
    },
  });
};

module.exports = Model;
