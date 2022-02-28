import React, { useEffect, useState } from "react";
import { Text } from "../elements";

import { apiKey } from "../shared/firebase";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as likeActions } from "../redux/modules/like";

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const HeartButton = (props) => {
  const dispatch = useDispatch();
  const like_list = useSelector((state) => state.like.list);
  const user_info = useSelector((state) => state.user.user);

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  const { post_id } = props;

  useEffect(() => {
    if (like_list[post_id]?.includes(user_info?.uid)) {
      setToggle(true);
    } else {
      setToggle(false);

    }
  });

  const [toggle, setToggle] = useState(false);
  const updateHeart = () => {
    if (!user_info || !is_session) {
      return history.replace("/caution");
    } else if (!like_list[post_id]?.includes(user_info.uid)) {
      dispatch(likeActions.addLikeFB(post_id));
    } else if (like_list[post_id]?.includes(user_info.uid)) {
      dispatch(likeActions.cancelLikeFB(post_id));
    }
  };
  return (
    <div className="cursor-pointer">
        <Text _onClick={updateHeart}>
      {toggle ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon color="error" /> } 
        </Text>
    </div>
    );
  };


export default HeartButton;
