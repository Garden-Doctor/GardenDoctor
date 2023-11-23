import { Route, Routes, BrowserRouter } from "react-router-dom";

import NotFound from "./components/NotFound";

import Signup from "./components/signUp/Signup";
import WriteBoard from "./components/community/WriteBoard";

import Login from "./components/logIn/Login";
import Chat from "./components/chatAI/Chat";

import Main from "./components/main/Main";
import TopBar from "./components/TopBar";
import BoardDetail from "./components/community/BoardDetail";
import EditBoard from "./components/community/EditBoard";
import BottomBar from "./components/BottomBar";

import Dignose from "./components/imageAI/Dignose";
import DignoseResult from "./components/imageAI/DignosisResult";

import Home from "./components/Home";
import Board from "./components/community/Board";
import MyBoards from "./components/myPage/MyBoards";
import Footer from "./components/Footer";
import NaviBar from "./components/NaviBar";

import "../src/styles/app.scss";
import SideBar from "./components/SideBar";
import { useState } from "react";

import MyPlants from "./components/myPage/MyPlants";

import MyPage from "./components/myPage/MyPage";


function App() {
  return (
    <>
      <BrowserRouter>
        <TopBar />
        <div className="app-container">
          {/* Max Min 값 정해두기 */}
          <Routes>
            <Route path="/" element={<Main></Main>}></Route>

            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/chat" element={<Chat></Chat>}></Route>
            <Route path="/Board" element={<Board></Board>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/signup" element={<Signup></Signup>}></Route>
            <Route
              path="/writeBoard"
              element={<WriteBoard></WriteBoard>}
            ></Route>
            <Route
              path="/boardDetail/:userId/:boardId"
              element={<BoardDetail></BoardDetail>}
            ></Route>
            <Route
              path="/editBoard/:userId/:boardId"
              element={<EditBoard></EditBoard>}
            ></Route>
            <Route path="*" element={<NotFound></NotFound>}></Route>
            <Route path="/imageAI" element={<Dignose></Dignose>}></Route>
            <Route
              path="/diagnosisResult"
              element={<DignoseResult></DignoseResult>}
            ></Route>
            <Route path="/myBoards" element={<MyBoards></MyBoards>}></Route>

            <Route path="/myPlants" element={<MyPlants></MyPlants>}></Route>

            <Route path="/myPage" element={<MyPage></MyPage>}></Route>

          </Routes>
        </div>
        <BottomBar />
      </BrowserRouter>
    </>
  );
}

export default App;
