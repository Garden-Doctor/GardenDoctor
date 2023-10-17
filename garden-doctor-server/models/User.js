import { DataTypes } from "sequelize";

const User = (sequelize) => {
  return sequelize.define("gardenUsers", {
    // Column Definitions
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

export { User };
