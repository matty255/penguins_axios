import React, { useState } from "react";
import { Input, Button } from "../elements";

import { useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const { post_id } = props;

  const writeComment = (e) => {
    setComment(e.target.value);
  };

  const addComment = () => {
    dispatch(commentActions.addCommentFB(post_id, comment));
    setComment("");
  };
  return (
    <React.Fragment>
    <div className="flex flex-row justify-between font-sanss2 text-yellow-800">
      <Input
        type="text"
        placeholder="댓글 내용을 입력하세요 :)"
        value={comment}
        _onChange={writeComment}
        is_submit={true}
        _onSubmit={addComment}
      />
      <Button _onClick={addComment} >추가</Button>
    </div></React.Fragment>
  );
};

export default CommentWrite;
