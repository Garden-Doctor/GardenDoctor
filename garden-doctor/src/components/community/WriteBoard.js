import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const WriteBoard = () => {
  const [boardText, setBoardText] = useState("");
  const username = useSelector((state) => state.user);
  const navigate = useNavigate();

  const uploadButton = async (e) => {
    // async 키워드 추가
    e.preventDefault(); // preventDefault() 사용
    const formData = new FormData();
    const file = document.querySelector('input[name="image"]');
    for (let i = 0; i < file.files.length; i++) {
      formData.append("files", file.files[i]);
    }
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:8000/upload",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((result) => {
        console.log(result.data);
        const res2 = axios({
          method: "POST",
          url: "http://localhost:8000/board/uploadBoard",
          data: {
            userId: username,
            text: boardText,
            img: result.data,
          },
        });
        console.log(res2);
      });
      console.log("res", res);
      alert("게시글 생성 완료!");
      navigate("/board"); // 요청 성공 후 페이지를 이동할 경우
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-container">
      <form encType="multipart/form-data">
        게시할 사진을 업로드 해주세요:{" "}
        <input type="file" name="image" multiple /> <br />
        게시글 설명: <br />
        <textarea
          name="boardText"
          id="boardText"
          cols="30"
          rows="10"
          placeholder="내용을 추가해주세요"
          onChange={(e) => setBoardText(e.target.value)}
        ></textarea>
        <br />
        <button onClick={uploadButton}>게시</button>
      </form>
      <img id="img1" src="" alt="" />
    </div>
  );
};

export default WriteBoard;
