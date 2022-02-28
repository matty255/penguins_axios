import React from "react";
import tw from "tailwind-styled-components";

const P = tw.p`
  text-base md:text-lg text-yellow-800 font-sanss2 p-4 
  bg-yellow-300 rounded-md m-1
  ${(props) => (props.is_false ? "" : "truncate")};
`;

const PostText = (props) => {
  const { children, margin, width, bold, _onClick, is_click, center, is_false } =
    props;

  const styles = {
    children,
    margin,
    width,
    bold,
    is_click,
    center,
    is_false,
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
  is_false : false
};



export default PostText;
