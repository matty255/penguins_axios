import React from "react";

import { useSelector } from "react-redux";
import { getCookie } from "./Cookie";

const Permit = (props) => {

  const is_login = useSelector((state) => state.user);
  console.log(is_login);

  const is_token = getCookie("token") ? true : false;

  if (is_token) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }

  return null;
};

export default Permit;