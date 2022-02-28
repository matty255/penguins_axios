import React from "react";
import tw from "tailwind-styled-components"

const TitleText = tw.div`
  font-sanss ml-2 text-5xl font-bold tracking-wide text-gray-100
  cursor-pointer underline decoration-gray-100
`;

const Title = (props) => {
  const { children, margin, width, bold, _onClick, is_click, center } =
  props;

const styles = {
  children,
  margin,
  width,
  bold,
  is_click,
  center,
};

  return <TitleText {...styles} onClick={_onClick} >{children}</TitleText>;
};

Title.defaultProps = {
  children: null,
  margin: false,
  bold: false,
  _onClick: () => {},
  is_click: false,
  width: false,
  center: false,
};



export default Title;
