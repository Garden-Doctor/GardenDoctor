import Board from "./components/community/Board";
import Footer from "./components/Footer";
import NaviBar from "./components/NaviBar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/logIn/Login";
import Signup from "./components/signUp/Signup";
import WriteBoard from "./components/community/WriteBoard";
import Dignose from "./components/imageAI/Dignose";
import Main from "./components/Main";

function App() {
  return (
    <>
      <Main />

      <BrowserRouter>
        <NaviBar></NaviBar>
        <div style={{ width: "85vw", height: "77vh", overflowY: "scroll" }}>
          <Routes>
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
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
