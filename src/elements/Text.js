import React from "react";
import tw from "tailwind-styled-components";

const P = tw.p`
  text-base text-yellow-800 font-sanss2
`;

const Text = (props) => {
  const { children, _onClick} =
    props;

  const styles = {
    children,
  };
  return (
    <P {...styles} onClick={_onClick}>
      {children}
    </P>
  );
};

Text.defaultProps = {
  children: null,
  _onClick: () => {},
  is_click: false,
};


export default Text;
