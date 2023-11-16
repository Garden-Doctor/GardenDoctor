import db from "../models/index.js";
import Chats from "../models/Chats.js";

const askQuestion = async (req, res) => {
  try {
    console.log(req.body);
    const { question } = req.body;
    const storeQ = await db.Chats.create({
      chatMessage: question,
    });
    console.log(storeQ);
    res.send("저장 성공");
  } catch (error) {
    console.log(error);
  }
};

export { askQuestion };
