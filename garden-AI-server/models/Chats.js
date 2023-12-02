import DataTypes from "sequelize";

const Chats = (sequelize) => {
  return sequelize.define("Chats", {
    //컬럼 정의
    chat_id: {
      type: DataTypes.INTEGER,
      allowNull: false, //NOT NULL
      primaryKey: true,
      autoIncrement: true,
    },
    chat_message: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    is_ai: {
      type: DataTypes.BOOLEAN,
      allowNul: false,
    },
  });
};

export default Chats;
