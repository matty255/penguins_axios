import React from "react";
import { NonGrid, NonFlexBox, Image, Text, Button, PostText } from "../elements";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import HeartButton from "./HeartButton";


const Post = (props) => {
  const dispatch = useDispatch();

  const {
    user_id, 
    post_id, 
    contents, 
    img_url, 
    like_cnt,
    create_date, 
    modified_date,
    like_ok,
  } = props;




  return (
    <NonFlexBox>
          <div>
            <hr className="border-4 border-double border-white" />
            <NonGrid>
              <Text>By {user_id}</Text>
              <Text>{create_date}</Text>
          </NonGrid>
          </div>

        <div>
          <NonGrid>
            <div className="flex flex-col">
            <PostText>{contents}</PostText>
            <Image shape="big_square" src={img_url} />
            </div>
          </NonGrid>
          <NonGrid>
              
            <HeartButton post_id={post_id} like_ok={like_ok} like_cnt={like_cnt}></HeartButton>
            </NonGrid>
            <Button
          _onClick={() => {
            dispatch(postActions.deletePostAxios(props.post_id));
          }}
        >
          삭제하기
        </Button>
            <Button
              _onClick={() => {
                history.push(`/write/${post_id}`);
              }}
            ><span className="text-xs sm:text-lg">Edit</span></Button>
        </div>

    </NonFlexBox>
  );
};

Post.defaultProps = {
  user_id : 11, 
  post_id : 11, 
  contents : "라라라", 
  img_url : "https://user-images.githubusercontent.com/89088205/155067792-882e3507-e664-4b31-ad9a-4b7abf4af948.jpg", 
  like_cnt : 0,
  create_date : "", 
  modified_date : "",
  like_ok : 0,
};

export default Post;
