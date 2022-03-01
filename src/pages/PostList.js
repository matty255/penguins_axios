import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

import Post from "../components/Post";
import { Intro } from "../elements";
import { getCookie, deleteCookie } from "../shared/Cookie";
const PostList = (props) => {
  const dispatch = useDispatch();
  const {list, is_loading } = useSelector((state) => state.post);

  let [ is_loaded, setIsLoaded ] = useState(true);

  useEffect(() => {
      dispatch(postActions.loadPostAxios(dispatch));
  }, []);

  useEffect(() => {
    setTimeout(()=>{ setIsLoaded(false) }, 1000);
}, [is_loaded])
  const is_token = getCookie("token") ? true : false;


  return (

<div className="p-4">
    {is_loaded && <Intro />}

        {list.map((post) => {
          //로그인 했을 때만 체크하기 위해 optional chaining
          // 이런식으로도 쓰는구나

            return <Post key={post?.post_id} {...post} />;
        })}
      </div>
  );
};

export default PostList;
