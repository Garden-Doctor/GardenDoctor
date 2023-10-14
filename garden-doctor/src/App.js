import Analysis from "./components/Analysis";
import Board from "./components/Board";
import Chat from "./components/Chat";
import Footer from "./components/Footer";
import NaviBar from "./components/NaviBar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Simulation from "./components/Simulation";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Signup from "./components/Signup";
import WriteBoard from "./components/WriteBoard";

function App() {
  return (
    <>
      <BrowserRouter>
        <NaviBar></NaviBar>
        <div style={{ width: "85vw", height: "70vh" }}>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/chat" element={<Chat></Chat>}></Route>
            <Route path="/analysis" element={<Analysis></Analysis>}></Route>
            <Route path="/Board" element={<Board></Board>}></Route>
            <Route
              path="/simulation"
              element={<Simulation></Simulation>}
            ></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/signup" element={<Signup></Signup>}></Route>
            <Route
              path="/writeBoard"
              element={<WriteBoard></WriteBoard>}
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
