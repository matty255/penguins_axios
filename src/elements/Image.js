import React from "react";
import tw from "tailwind-styled-components";

const CircleImage = tw.img`
  bg-cover rounded-full m-1 w-12 h-12 border-2 border-yellow-200
  shadow-md 
`;

const SmallSquareImage = tw.img`
  bg-fixed m-1 rounded-md w-14 h-14 border-2 border-yellow-200
  opacity-80 contrast-125
`;


const BigSquareImage = tw.img`
  w-full bg-cover rounded-xl p-1
  ${(props) => (props.half ? "flex-auto" : "")}
  ${(props) => (props.half ? "w-3/4" : "")}
`;

const Image = (props) => {
  const { src, shape, half } = props;

  const styles = {
    src,
    half,
  };

  if (shape === "circle") {
    return <CircleImage {...styles} src={src} />;
  }

  if (shape === "big_square") {
    return <BigSquareImage {...styles} src={src} />;
  }

  if (shape === "small_square") {
    return <SmallSquareImage {...styles} src={src} />;
  }
};

Image.defaultProps = {
  shape: "circle",
  src: "https://user-images.githubusercontent.com/89088205/155078987-592a07cd-a490-49fc-aabc-bc47cb508963.jpg",
  half: false,
};
 





export default Image;
