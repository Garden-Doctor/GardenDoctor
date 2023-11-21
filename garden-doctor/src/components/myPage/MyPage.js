import { useSelector } from "react-redux";

const MyPage = () => {
  const userId = useSelector((state) => state.user);

  return (
    <div className="myPage-main-container">
      <div className="Title">마이페이지</div>
      <div className="myInfo"></div>
      <div className="myBoards"></div>
    </div>
  );
};
export default MyPage;
