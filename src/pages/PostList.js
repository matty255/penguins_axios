import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import Post from "../components/Post";
import { Intro } from "../elements";
import InfinityScroll from "../shared/InfinityScroll";

const PostList = (props) => {
  const dispatch = useDispatch();
  const { list, is_loading, paging } = useSelector((state) => state.post);
  const user = useSelector((state) => state.user?.user);
  let [ is_loaded, setIsLoaded ] = useState(true);

  useEffect(() => {
    if (list.length < 2) {
      dispatch(postActions.loadPostFB());
    }
  }, []);

  useEffect(() => {
    setTimeout(()=>{ setIsLoaded(false) }, 1000);
}, [is_loaded])
  
  return (

<div className="p-4">
    {is_loaded && <Intro />}
      <InfinityScroll
        callNext={() => {
          dispatch(postActions.loadPostFB(paging.next));
        }}
        is_next={paging.next ? true : false}
        loading={is_loading}
      >
        {list.map((post, idx) => {
          //로그인 했을 때만 체크하기 위해 optional chaining
          // 이런식으로도 쓰는구나
          if (post.user_info.user_id === user?.uid) {
            return <Post key={post.id} {...post} is_me={true} />;
          } else {
            return <Post key={post.id} {...post} />;
          }
        })}
      </InfinityScroll>
      </div>
  );
};

export default PostList;
