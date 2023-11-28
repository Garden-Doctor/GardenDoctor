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
      type: DataTypes.TEXT,
    },
    solution: {
      type: DataTypes.TEXT,
    },
  });
};

module.exports = Model;
