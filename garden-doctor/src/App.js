import Board from "./components/community/Board";

import Footer from "./components/Footer";
import NaviBar from "./components/NaviBar";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/logIn/Login";
import Signup from "./components/signUp/Signup";
import WriteBoard from "./components/community/WriteBoard";
import Main from "./components/main/Main";
import TopBar from "./components/TopBar";
import BoardDetail from "./components/community/BoardDetail";
import EditBoard from "./components/community/EditBoard";

function App() {
  return (
    <>
      <BrowserRouter>
        <TopBar />
        <div>
          <Routes>
            <Route path="/" element={<Main></Main>}></Route>

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
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
