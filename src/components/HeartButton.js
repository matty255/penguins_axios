import React, { useEffect, useState } from "react";
import { Text } from "../elements";

import { apiKey } from "../shared/firebase";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as likeActions } from "../redux/modules/like";
import { getCookie, deleteCookie } from "../shared/Cookie";

import FavoriteIcon from '@mui/icons-material/Favorite';

const HeartButton = (props) => {
  const dispatch = useDispatch();

  // const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  // const is_session = sessionStorage.getItem(_session_key) ? true : false;
  const is_token = getCookie("token") ? true : false;

  const [like_cnt, setLikeCnt] = useState(props.like_cnt);
  const [like_ok, setLikeOk] = useState(props.like_ok);

  const cancelLike = () => {
    if(!is_token) {
      history.push("/caution");
    } else
    dispatch(likeActions.cancelLikeAxios(props.post_id));
    setLikeOk(false);
    setLikeCnt(like_cnt - 1);
  };

  const addLike = () => {
    if(!is_token) {
      history.push("/caution");
    } else
    dispatch(likeActions.addLikeAxios(props.post_id));
    setLikeOk(true);
    setLikeCnt(like_cnt + 1);
  };
  

  return (
    <div className="cursor-pointer flex flex-row">
      
        {like_ok ? (
            <FavoriteIcon className="text-red-400" onClick={cancelLike} />
          ) : (
            <FavoriteIcon onClick={addLike} />
          )}
        <Text><span className="text-2xl font-bold"> {like_cnt}</span></Text>
    </div>
    );
  };


export default HeartButton;
