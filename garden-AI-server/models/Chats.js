import DataTypes from "sequelize";

const Chats = (sequelize) => {
  return sequelize.define("Chats", {
    //컬럼 정의
    messageId: {
      type: DataTypes.INTEGER,
      allowNull: false, //NOT NULL
      primaryKey: true,
      autoIncrement: true,
    },
    chatMessage: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    isAI: {
      type: DataTypes.BOOLEAN,
      allowNul: false,

    }
  });
};

export default Chats;
