import Board from "./components/community/Board";
import Footer from "./components/Footer";
import NaviBar from "./components/NaviBar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

import Signup from "./components/signUp/Signup";
import WriteBoard from "./components/community/WriteBoard";
import Main from "./components/Main";
import Login from "./components/logIn/Login";
import Chat from "./components/chatAI/chatBackground";

function App() {
  return (
    <>
      <BrowserRouter>
        <NaviBar></NaviBar>

        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/chat" element={<Chat></Chat>}></Route>
          <Route path="/analysis" element={<Main></Main>}></Route>
          <Route path="/Board" element={<Board></Board>}></Route>
          <Route path="/simulation" element={<Main></Main>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/writeBoard" element={<WriteBoard></WriteBoard>}></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
