import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { setCookie, deleteCookie } from "../../shared/Cookie";

import { instance } from '../../axios/axios';

//액션선언
const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";
const CHECK_USER = "CHECK_USER";

//액션생성
const setUser = createAction(SET_USER, (user) => ({ user }));
const deleteToken = createAction(LOG_OUT, (user) => ({ user }));
const checkUser = createAction(CHECK_USER, (user) => ({ user }));

//intialState
const initialState = {
  user: null,
  is_login: false,
};


const signupAxios = (username, password, name, check_password) => {
  return function (dispatch, getState, { history }) {
    console.log("signupAxios::: ", username, password, name);

    const user = {
      username: username,
      name: name,
      password: password,
      check_password: check_password,
    };
    // check_password: check_password,
    instance
    .post("api/signup", user)
      .then((res) => {
        window.alert("회원가입을 축하드립니다.");
        history.replace("/login");
      })
      .catch((err) => window.alert("회원가입 실패: ", err.response));
  };
};

const loginAxios = (username, password) => {
  return function (dispatch, getState, { history }) {
    const user = {
      username: username,
      password: password,
    };

    instance
      .post(
        'api/signin',
        user,
        // 다른 도메인간 쿠키 전송하기?? 나중에 검색
      )
      .then((res) => {

        if (res.status === 200) {
          dispatch(setUser({ username, password }));
          window.alert('로그인 되었습니다.');
          // console.log(setCookie("token", res.data))
          // console.log(res)
          setCookie("token", res.data)
          window.location.replace("/")
          
        }
      })
      .catch((err) => window.alert('로그인 실패: ', err.message));
  };
};



const loginCheck = (token) => {
  return function (dispatch, getState, { history }) {
    if (token) {
      dispatch(checkUser)
    }
  };
};

const logOut = (token) => {
  return function (dispatch, getState, { history }) {
    deleteCookie("token");
    window.alert("다음에 다시 만나요!");
    dispatch(deleteToken());
    history.replace("/");
  };
};


//reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.is_login = false;
      }),
    [CHECK_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
  },
  initialState
);


const actionCreators = {
  signupAxios,
  loginAxios,
  logOut,
  loginCheck,
};

export { actionCreators };
