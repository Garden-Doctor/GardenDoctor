import React, { useEffect, useState, useRef } from "react";
import "../../styles/chatAI/chat.scss";
import SEND_icon from "../../imgs/chat-send.svg";
import axios from "axios";
import { useSelector } from "react-redux";

const Chat = () => {
  const [text, setText] = useState("");
  const [chat, setChat] = useState([]); // {ai: boolean, m:''}
  const [chatHistory, setChatHistory] = useState([]);
  const messages = useRef();
  const prevMessages = useRef();
  const inputMsg = useRef();
  const loading = useRef();
  const userId = useSelector((state) => state.user);
  console.log("로그인아이디", userId);
  console.log("chatHistory:", chatHistory);

  useEffect(() => {
    const a = async () => {
      const res = await axios({
        method: "POST",
        url: "http://localhost:8001/chat/loadPrevChats",
        data: {
          currentUser: userId,
        },
      });
      const prevChats = res.data;
      console.log("prevChats", prevChats);
      const chatData = prevChats.map((c) => {
        const prevChat = { ai: c.is_ai, m: c.chat_message };
        return prevChat;
      });
      setChatHistory(chatData);

      // console.log("retrieved data: ", res.data);
      // const prevChat = { ai: res.data.isAI, m: res.data.chatMessage };
      // setChat([...chat, prevChat]);

      // console.log("prevChat받아온 후에 Chat: ", chat);
    };
    a();
  }, []);
  //새 채팅이 나올 때 제일 아래로 스크롤
  useEffect(() => {
    inputMsg.current.value = "";
    messages.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    console.log(messages.current);
  }, [chat]);

  const handleChatInput = (e) => {
    setText(e.target.value);
  };

  const handleChatSend = () => {
    if (text !== "") {
      const newChat = { ai: false, m: text };
      setChat([...chat, newChat]);
      setText("");
    }
  };
  useEffect(() => {
    console.log("chat changed");
    const lastChat = chat[chat.length - 1];
    console.log("lastChat : ", lastChat);
    if (!lastChat || lastChat.ai) return;
    sendQuestion(lastChat, userId);
    loading.current.style.display = "block";
  }, [chat]);

  const sendQuestion = async (lastChat, userId) => {
    console.log("sendQuestion: ", lastChat);
    const res = await axios({
      method: "POST",
      url: "http://localhost:8001/chat/askQuestion",
      data: {
        question: lastChat.m,
        isAI: false,
        userId,
      },
    });
    if (res.data !== "") {
      loading.current.style.display = "none";
      console.log("sendQuestiondata : ", res.data);
      const aiChat = { ai: true, m: res.data };
      setChat([...chat, aiChat]);

      console.log("chat axios 이후에", chat);
    }
  };
  return (
    <div className="chat-background">
      <div className="chat-msgContainer">
        <ChatList chatList={chatHistory}></ChatList>
        <ChatList chatList={chat} ref={messages}></ChatList>
        <span class="loader" ref={loading} style={{ display: "none" }}></span>
      </div>

      <div className="chat-send-box">
        <input
          type="text"
          className="chat-input"
          placeholder="질문을 해보세요"
          ref={inputMsg}
          onChange={handleChatInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleChatSend();
            }
          }}
        />
        <button
          type="button"
          className="chat-send"
          onClick={() => {
            handleChatSend();
          }}
        >
          <img src={SEND_icon} alt="sendIcon" />
        </button>
      </div>
    </div>
  );
};

const ChatList = React.forwardRef(({ chatList }, ref) => {
  return (
    <>
      {chatList.map((chat, i) => {
        let mode = "myChat";
        if (chat.ai) mode = "aiChat";
        return (
          <div key={i} ref={ref} className={`${mode}-box`}>
            <p className={`${mode}-msg`}>{chat.m}</p>
          </div>
        );
      })}
    </>
  );
});

export default Chat;
