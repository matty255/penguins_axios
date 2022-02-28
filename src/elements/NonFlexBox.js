import React from "react";
import tw from "tailwind-styled-components";


const Btime = tw.div` 
    bg-yellow-300 rounded-sm
    text-yellow-800 font-sanss2 justify-evenly items-center
    shadow-md my-3 p-4
` 

const NonFlexBox = (props) => {
  const {
    children,
    is_flex,
    _onClick,
    is_main,
  } = props;

  const styles = {
    is_flex,
    is_main,
  };
  return (
      <React.Fragment>
    <Btime {...styles} onClick={_onClick}>
      {children}
    </Btime>
    </React.Fragment>
  );
};

NonFlexBox.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  relative: false,
  _onClick: () => {},
};

export default NonFlexBox;
