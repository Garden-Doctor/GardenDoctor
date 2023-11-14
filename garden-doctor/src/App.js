import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/logIn/Login";
import Signup from "./components/signUp/Signup";
import WriteBoard from "./components/community/WriteBoard";
import Main from "./components/main/Main";
import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";
import Board from "./components/community/Board";
import Footer from "./components/Footer";
import NaviBar from "./components/NaviBar";

import "../src/styles/app.scss";
import SideBar from "./components/SideBar";
import Dignose from "./components/imageAI/Dignose";

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
            <Route path="/Board" element={<Board></Board>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/signup" element={<Signup></Signup>}></Route>
            <Route
              path="/writeBoard"
              element={<WriteBoard></WriteBoard>}
            ></Route>
            <Route path="*" element={<NotFound></NotFound>}></Route>
            <Route path="/imageAI" element={<Dignose></Dignose>}></Route>
          </Routes>
        </div>
        <BottomBar />
      </BrowserRouter>
    </>
  );
}

export default App;
