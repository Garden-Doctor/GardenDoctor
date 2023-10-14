import { createStore } from "redux";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

// 초기 상태 정의
const initialState = {
  isLogIn: false,
  user: null,
};

//리듀서 함수
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogIn: true,
        user: action.user,
      };
    case LOGOUT:
      return {
        ...state,
        isLogIn: false,
        user: null,
      };
    default:
      return state;
  }
};
//스토어 생성, 리듀서 함수가 필수
const store = createStore(rootReducer);

export default store;
