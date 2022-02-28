import React, { useEffect } from "react";
import { NonGrid, NonFlexBox, Image, Text, Button, PostText } from "../elements";

import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as likeActions } from "../redux/modules/like";

import HeartButton from "./HeartButton";


const Post = (props) => {
  const dispatch = useDispatch();

  const {
    user_info,
    image_url,
    contents,
    like_cnt,
    insert_dt,
    id,
    layout,
    comment_cnt,
    show
  } = props;

  useEffect(() => {
    dispatch(likeActions.getLikeFB(id));
  }, []);
  return (
    <NonFlexBox>
          <div>
            <hr className="border-4 border-double border-white" />
            <NonGrid>
              <Image shape="circle" src={props.src} />
              <Text>By {user_info.user_name}</Text>
              <Text>{insert_dt}</Text>
              {props.is_me && (
                <Button
                  _onClick={() => {
                    history.push(`/write/${id}`);
                  }}
                ><span className="text-xs sm:text-lg">Edit</span></Button>
              )}
          </NonGrid>
          </div>

      {layout === "right" && (
        <div>
          <NonGrid>
           {!show && <PostText>{contents}</PostText> }
            <Image half={true} shape="big_square" src={image_url} />

          </NonGrid>
          <NonGrid>

            <Text>좋아요 <span className="text-xl">{like_cnt}</span>개</Text>
            <HeartButton post_id={id}></HeartButton>
            <div className="cursor-pointer hover:scale-110 font-bold"><Text
          _onClick={() => {
            history.push(`/post/${id}`);
          }}>댓글 <span className="text-xl">{comment_cnt}</span>개</Text></div>

        </NonGrid>
      </div>
      )}

      {layout === "left" && (
        <div>
          <NonGrid>
            <Image half={true} shape="big_square" src={image_url} />
            {!show && <PostText>{contents}</PostText> }
          </NonGrid>


          <NonGrid>
            <Text>좋아요 <span className="text-xl">{like_cnt}</span>개</Text>
            <HeartButton post_id={id}></HeartButton>
            <div className="cursor-pointer hover:scale-110 font-bold"><Text
          _onClick={() => {
            history.push(`/post/${id}`);
          }}>댓글 <span className="text-xl">{comment_cnt}</span>개</Text></div>
            </NonGrid>
          </div>
      )}
      {layout === "bottom" && (
        <div>
          <NonGrid>
            <div className="flex flex-col">
            {!show && <PostText>{contents}</PostText> }
            <Image shape="big_square" src={image_url} />
            </div>
          </NonGrid>
          <NonGrid>
            <Text>좋아요 <span className="text-xl">{like_cnt}</span>개</Text>
            <HeartButton post_id={id}></HeartButton>
            <div className="cursor-pointer hover:scale-110 font-bold"><Text
          _onClick={() => {
            history.push(`/post/${id}`);
          }}>댓글 <span className="text-xl">{comment_cnt}</span>개</Text></div>
            </NonGrid>
        </div>
      )}
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
  comment_cnt: 0,
  insert_dt: "2021-06-30 10:00:00",
  show: false,
};

export default Post;
