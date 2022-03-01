import React, { useState, useEffect } from "react";
import { NonFlexBox, Title, Input, Button } from "../elements";
// import { apiKey } from "../shared/firebase";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { getCookie, deleteCookie } from "../shared/Cookie";

import tw from "tailwind-styled-components";

const Margins = tw.div` 
  mt-24 mx-4 pb-10
`
const Signup = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const jwtToken = getCookie("token") ? true : false;

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [check_password, setCheckPassword] = useState("");

  const signup = () => {
    if (password !== check_password) {
      window.alert("비밀번호가 일치하지 않습니다!");
      return
    }

    
    // dispatch(userActions.signUpFB(id, pwd, user_name));
    dispatch(userActions.signupAxios(username, password, name, check_password));
  };

  // const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  // const is_session = sessionStorage.getItem(_session_key) ? true : false;

  // useEffect(() => {
  //   if (is_session) {
  //     alert("이미 로그인한 사용자입니다")
  //     history.push("/");
  //   }
  // }, []);
  

  return (
    <Margins>
      <NonFlexBox>
      <Title>Sing-up</Title>
      <div className="mt-5"></div>
      <Input
        value={username}
        label="아이디"
        placeholder="아이디를 입력해주세요!"
        _onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <Input
        value={name}
        label="닉네임"
        placeholder="닉네임을 입력해주세요!"
        _onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Input
        value={password}
        type="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요!"
        _onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Input
        value={check_password}
        type="password"
        label="비밀번호 확인"
        placeholder="비밀번호를 다시 입력해주세요!"
        _onChange={(e) => {
          setCheckPassword(e.target.value);
        }}
        _onSubmit={signup}
        is_submit={true}
      />
      <div className="mt-7">
      <Button
        margin="30px 0"
        _disabled={
          username === "" || name === "" || password === "" || check_password === ""
            ? true
            : false
        }
        _onClick={signup}
      >
        회원가입하기
      </Button>
      </div>
      </NonFlexBox>
    </Margins>
  );
};

export default Signup;
