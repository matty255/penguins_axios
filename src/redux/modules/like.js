import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { instance, token } from "../../axios/axios";


const ADD_LIKE = "ADD_LIKE";
const CANCEL_LIKE = "CANCEL_LIKE";

const addLike = createAction(ADD_LIKE, (post_id) => ({ post_id }));

const cancelLike = createAction(CANCEL_LIKE, (post_id) => ({ post_id }));

const initialState = {
  like_cnt: 0,
};


const addLikeAxios = (post_id) => {
  return function (dispatch, getState, { history }) {
    instance
      .post(
        `/api/favorite/${post_id}`,
        {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        },
        { withCredentials: true }
      )
      .then((docs) => {
        // console.log(docs);
        dispatch(addLike(post_id));
      })
      .catch((err) => {
        console.log("like::: ", err.response);
      });
  }

};





const cancelLikeAxios = (post_id) => {
  return function (dispatch, getState, { history }) {
    instance
      .post(
        `/api/favorite/${post_id}`,
        {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        },
        { withCredentials: true }
      )
      .then((docs) => {
        // console.log(docs);
        dispatch(cancelLike(post_id));
      })
      .catch((err) => {
        console.log("like::: ", err.response);
      });
  };
};

export default handleActions(
  {

    [ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id].push(action.payload.user_id);
      }),
    [CANCEL_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id] = draft.list[
          action.payload.post_id
        ].filter((l) => l !== action.payload.user_id);
      }),
  },
  initialState
);

const actionCreators = {
  addLike,
  cancelLike,
  addLikeAxios,
  cancelLikeAxios,
};

export { actionCreators };
