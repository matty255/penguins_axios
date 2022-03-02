import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import Post from "../components/Post";
import { Intro } from "../elements"
const PostList = (props) => {
  const dispatch = useDispatch();
  const {list} = useSelector((state) => state.post);

  let [ is_loaded, setIsLoaded ] = useState(true);

  useEffect(() => {
      dispatch(postActions.loadPostAxios(dispatch));
  }, []);

  useEffect(() => {
    setTimeout(()=>{ setIsLoaded(false) }, 1000);
}, [is_loaded])

  return (

<div className="p-4">
    {is_loaded && <Intro />}

        {list.map((post) => {
            return <Post key={post?.post_id} {...post} />;
        })}
      </div>
  );
};

export default PostList;
