import React, { useState } from "react";

import { NonFlexBox, Title, Input, Button } from "../elements";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import tw from "tailwind-styled-components";

const Margins = tw.div` 
  mt-24 mx-4 pb-10
`

const Login = (props) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const login = () => {

    dispatch(userActions.loginAxios(username, password));
  };

  return (
    <Margins>
    <NonFlexBox>
      <Title>Log-in</Title>
      <div className="mt-5" />
      <Input
        value={username}
        label="아이디"
        placeholder="아이디를 입력해주세요!"
        _onChange={(e) => {
          setUsername(e.target.value);
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
        is_submit={true}
        _onSubmit={login}
      />
      <div className="mt-7">
      <Button
        _onClick={login}
        _disabled={username === "" || password === "" ? true : false}
      >
        로그인하기
      </Button>
      </div>
    </NonFlexBox>
    </Margins>
  );
};

export default Login;
