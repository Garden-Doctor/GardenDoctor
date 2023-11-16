import React, { useEffect, useState, useRef } from "react";
import "../../styles/chatAI/chatBackground.scss";
import SEND_icon from "../../imgs/chat-send.svg";
import axios from "axios";

const Chat = () => {
  const [text, setText] = useState("");
  const [chat, setChat] = useState([]);

  const handleChatInput = (e) => {
    setText(e.target.value);
  };

  const handleChatSend = () => {
    const chatCopy = [...chat];
    if (text !== "") {
      chatCopy.push(text);
      setChat(chatCopy);
      setText("");
    }
  };

  const sendQuestion = async () => {
    const res = await axios({
      method: "POST",
      url: "http://localhost:8001/chat/askQuestion",
      data: {
        question: chat[0],
      },
    });
    console.log(res);
  };

  return (
    <div className="chat-background">
      <MyChat chatList={chat}></MyChat>

      <div className="chat-send-box">
        <input
          type="text"
          className="chat-input"
          placeholder="질문을 해보세요"
          onChange={handleChatInput}
        />
        <button
          type="button"
          className="chat-send"
          onClick={() => {
            handleChatSend();
            sendQuestion();
          }}
        >
          <img src={SEND_icon} alt="sendIcon" />
        </button>
      </div>
    </div>
  );
};

const MyChat = ({ chatList }) => {
  return chatList.map((chat, i) => {
    return (
      <div className="myChat-box">
        <p key={i} className="myChat-msg">
          {chat}
        </p>
      </div>
    );
  });
};

export default Chat;
