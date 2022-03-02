import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { actionCreators as imageActions } from "./image";
import { storage } from "../../shared/firebase";
import { instance, token } from "../../axios/axios";

//action
const LOAD_POST = "LOAD_POST";
const ADD_POST = "ADD_POST";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";
const LOADING = "LOADING";

//action creators
const loadPost = createAction(LOAD_POST, (post_list) => ({
  post_list
}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const updatePost = createAction(UPDATE_POST, (post_id, new_post) => ({
  post_id, new_post,
}));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

//initialState
const initialState = {
  list: [],
  is_loading: false,
};

//middleware
const loadPostAxios = () => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    instance
      .get(`api/posts`, {
        headers: {
          "X-AUTH-TOKEN": token,
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(loadPost(res.data));
      })
      .catch((err) => console.log("getPostAxios::: ", err.response));
  };
};



const addPostAxios = (contents) => {
  return function (dispatch, getState, { history }) {

    const _image = getState().image.preview;

    const _upload = storage
      .ref(`images/${new Date().getTime()}`)
      .putString(_image, "data_url");

    //원시 문자열, base64, base64url 또는
    //data_url로 인코딩된 문자열을 Cloud Storage에 추가할 수 있습니다.

    _upload
    .then((snapshot) => {
    snapshot.ref
      .getDownloadURL()
      .then((url) => {
        dispatch(imageActions.uploadImage(url));
        return url;
      })
      .then((url) => {
        const data = { contents, img_url: url };
        // console.log(data)
        instance
          .post(`api/posts`, data, 
          {
            headers: {
              "X-AUTH-TOKEN": token,
            },
            withCredentials: true,
          })
          .then((doc) => {
            history.push("/");
            dispatch(imageActions.setPreview(null));
          })
          .catch((err) => {
            window.alert("앗! 글쓰기에 문제가 있어요!");
            console.log("글작성API::::: ", err.response);
          });
      })
      .catch((err) => {
        window.alert("앗! 이미지 업로드에 문제가 있어요!");
        console.log("글작성API::::: ", err.response);
      });
  });
};
};

const updatePostAxios = (post_id, post={}) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log("게시물 정보가 없어요!");
      return;
    }
    const data = { contents: post.contents, img_url: post.img_url}

      instance
        .patch(`api/posts/${post_id}`, data, {
          headers: {
            "X-AUTH-TOKEN": token,
          },
          withCredentials: true,
        })
        .then((res) => {
          history.replace("/");
          
        })
        .catch((err) => alert(err.response.data.errorMessage));
        history.replace("/");
  };
};

const deletePostAxios = (post_id) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log("게시물 정보가 없어요!");
      return;
    }

    instance
      .delete(`api/posts/${post_id}`, {
        headers: {
          "X-AUTH-TOKEN": token,
        },
        withCredentials: true,
      })
      .then(() => {
        window.location.replace("/")
        dispatch(deletePost(post_id));
      })
      .catch((err) => console.log(err.response.errorMessage));
  };
};


//reducer
export default handleActions(
  {
    [LOAD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        draft.is_loading = false;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [UPDATE_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((l) => l.post_id === action.payload.post_id);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.new_post };
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter((l) => l.id !== action.payload.post_id);
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  loadPost,
  addPost,
  updatePost,
  deletePost,
  loadPostAxios,
  addPostAxios,
  updatePostAxios,
  deletePostAxios,
};

export { actionCreators };
