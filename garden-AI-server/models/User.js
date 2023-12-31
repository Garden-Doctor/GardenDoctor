import DataTypes from "sequelize";

const User = (sequelize) => {
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
      allowNull: false,
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
  });
};

export default User;
