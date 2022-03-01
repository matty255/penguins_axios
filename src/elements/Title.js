import React from "react";
import tw from "tailwind-styled-components"

const TitleText = tw.div`
  font-sanss ml-2 text-5xl font-bold tracking-wide text-gray-100
  cursor-pointer underline decoration-gray-100
`;

const Title = (props) => {
  const { children, _onClick, is_click } =
  props;

const styles = {
  children,
  is_click,
};

  return <TitleText {...styles} onClick={_onClick} >{children}</TitleText>;
};

Title.defaultProps = {
  children: null,
  _onClick: () => {},
  is_click: false,
};



export default Title;
