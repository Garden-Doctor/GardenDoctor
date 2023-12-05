import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useEffect } from "react";

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
import { createContext, useState } from "react";

import { MyPlants } from "./components/myPage/MyPlants";

import MyPage from "./components/myPage/MyPage";
import AddPlant from "./components/myPlants/AddPlant";
import PlantDetail from "./components/myPlants/PlantDetail";

import KakaoLogin from "./components/logIn/KakaoLogin";
import axios from "axios";
import MyPageEdit from "./components/myPage/MyPageEdit";
import FindMyyIdPw from "./components/signUp/FindMyyIdPw";

import {
  SelectedButtonProvider,
  useSelectedButton,
} from "./components/SelectedButtonContext";

function App() {
  const { setSelectedButton } = useSelectedButton();

  useEffect(() => {
    const pathname = window.location.pathname;

    // 여기에 경로에 따른 로직 추가
    if (pathname.startsWith("/board")) {
      setSelectedButton("board");
    } else if (pathname.startsWith("/myPage")) {
      setSelectedButton("my");
    } else if (pathname.startsWith("/chat")) {
      // 다른 경로에 따른 로직 추가
      setSelectedButton("chat");
    }
  }, [setSelectedButton]);

  return (
    <>
      <BrowserRouter>
        <SelectedButtonProvider>
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
                path="/findIdPw"
                element={<FindMyyIdPw></FindMyyIdPw>}
              ></Route>
              <Route
                path="/writeBoard"
                element={<WriteBoard></WriteBoard>}
              ></Route>
              <Route
                path="/writeBoard/:userId/:myPlantId"
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
              <Route
                path="/myPlants/addPlant"
                element={<AddPlant></AddPlant>}
              ></Route>

              <Route
                path="/myPlants/plantDetail/:URLuserId/:plantId"
                element={<PlantDetail></PlantDetail>}
              ></Route>

              <Route path="/myPage" element={<MyPage></MyPage>}></Route>

              <Route path="/kakao/callback" element={<KakaoLogin />} />
              <Route path="/myPageEdit" element={<MyPageEdit></MyPageEdit>} />
            </Routes>
          </div>
          <BottomBar />
        </SelectedButtonProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
