import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.scss";

const SideBar = ({ onClose }) => {
  return (
    <div className="sidebar-container">
      <p className="sidebar-eixtbutton" onClick={onClose}>
        <img alt="나가기" src="/imgs/exit.svg" />
      </p>
      <p>
        <img alt="사람" src="/imgs/user.svg" />
      </p>
      <p>누구님</p>
      <p>마이페이지</p>
      <div className="sidebar-menu">
        <span active={true} component={<Link to="/" />}>
          {"병충해 진단"}
        </span>
        <span active={true} component={<Link to="/board" />}>
          {"AI 도우미"}
        </span>
        <span active={true} component={<Link to="/board" />}>
          {"소통의 정원"}
        </span>
        <span active={true} component={<Link to="/board" />}>
          {"내 작물"}
        </span>
        <span active={true} component={<Link to="/board" />}>
          {"내 게시글"}
        </span>
        <span />
      </div>
    </div>
  );
};

export default SideBar;
