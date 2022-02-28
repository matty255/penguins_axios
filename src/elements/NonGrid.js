import React from "react";
import tw from "tailwind-styled-components";


const Btime = tw.div` 
    bg-yellow-400 p-1 rounded-lg flex flex-row
    text-yellow-800 font-sanss2 justify-evenly items-center
    border-x-4 border-yellow-300 shadow-md my-3
` 

const NonGrid = (props) => {
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

NonGrid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  relative: false,
  _onClick: () => {},
};

export default NonGrid;
