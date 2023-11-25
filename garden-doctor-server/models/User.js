const { DataTypes } = require("sequelize");

const Model = (sequelize) => {
  return sequelize.define("gardenUsers", {
    //컬럼 정의
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
    },
    pw: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    nickName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    birth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    telNum: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    userImg: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    loginType: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  });
};

module.exports = Model;
