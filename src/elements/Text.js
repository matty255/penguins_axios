import React from "react";
import tw from "tailwind-styled-components";

const P = tw.p`
  text-base text-yellow-800 font-sanss2
`;

const Text = (props) => {
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
  return (
    <P {...styles} onClick={_onClick}>
      {children}
    </P>
  );
};

Text.defaultProps = {
  children: null,
  margin: false,
  bold: false,
  _onClick: () => {},
  is_click: false,
  width: false,
  center: false,
};


export default Text;
