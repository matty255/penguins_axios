import React, { useEffect } from "react";
import { Button, PostText } from "../elements";
import Post from "../components/Post";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import CommentWrite from "../components/CommentWrite";
import Permit from "../shared/Permit";
import CommentList from "../components/CommentList";

const PostDetail = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user?.user);
  const post_list = useSelector((state) => state.post?.list);

  const id = props.match.params?.id;
  const post = post_list.find((p) => p.id === id);

  useEffect(() => {
    //여기서도 마찬가지로 새로고침하면 reducer store는 리셋된다!
    //따라서 post가 있을 때(맨처음 detail 페이지로 왔을 때 )는 더 작업을 안해도 되고
    //디테일 페이지에서 새로고침을 했을 때마다 post_id에 해당하는 data하나만
    //firestore에서 load해온다!
    if (post) {
      return;
    }
    dispatch(postActions.loadOnePostFB(id));
  });

  const deletePost = () => {
    window.alert("삭제가 완료되었습니다!");
    dispatch(postActions.deletePostFB(id));
  };

  return (
    <>
      {post && (
        <>
          <Post {...post} show is_me={post.user_info.user_id === user_info?.uid} />
          <PostText is_false={true}>{post.contents}</PostText>
          {post.user_info.user_id === user_info?.uid ? (
            <div className="flex justify-center items-center hover:scale-105">
            <Button _onClick={deletePost}>Delete this Post?</Button>
            </div>
          ) : null}
          
        </>
      )}
      <Permit>
        <div className="p-2">
        <CommentWrite post_id={id} />
        </div>
      </Permit>
      <CommentList post_id={id} />
    </>
  );
};

export default PostDetail;
