import React, { useEffect } from "react";
import { NonGrid, NonFlexBox, Image, Text, Button, PostText } from "../elements";

import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as likeActions } from "../redux/modules/like";

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

  useEffect(() => {
    dispatch(likeActions.getLikeFB(post_id));
  }, []);
  return (
    <NonFlexBox>
          <div>
            <hr className="border-4 border-double border-white" />
            <NonGrid>
              <Image shape="circle" src={props.src} />
              <Text>By {user_id}</Text>
              <Text>{create_date}</Text>
              {props.is_me && (
                <Button
                  _onClick={() => {
                    history.push(`/write/${post_id}`);
                  }}
                ><span className="text-xs sm:text-lg">Edit</span></Button>
              )}
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
            <Text>좋아요 <span className="text-xl">{like_cnt}</span>개</Text>
            <HeartButton post_id={post_id} is_like={like_ok}></HeartButton>
            </NonGrid>
        </div>

    </NonFlexBox>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "pika",
    user_profile:
      "https://user-images.githubusercontent.com/89088205/155067524-151af583-2272-4b2d-b83a-c44158c16309.jpg",
  },
  image_url:
    "https://user-images.githubusercontent.com/89088205/155067792-882e3507-e664-4b31-ad9a-4b7abf4af948.jpg",
  contents: "안녕! 피카!",
  like_cnt: 0,
  insert_dt: "2021-06-30 10:00:00",
  show: false,
};

export default Post;
