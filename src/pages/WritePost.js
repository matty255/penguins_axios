import React, { useEffect, useState } from "react";
import { NonGrid, Input, Button, Image, Text, NonFlexBox, Intro, PostText } from "../elements";
import Upload from "../components/Upload";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

import { getCookie } from "../shared/Cookie";

const is_token = getCookie("token") ? true : false;

const WritePost = (props) => {
  const dispatch = useDispatch();
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);
  // console.log(post_list)
  const post_id = props.location.pathname.split("/")[2]
  const is_edit = post_id ? true : false;
  const _post = is_edit ? post_list?.filter(p => p.post_id == post_id) : null;
  
  const [input, setInput] = useState(_post ? _post[0]?.contents : "");
  let [ is_loaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    setTimeout(()=>{ setIsLoaded(false) }, 4000);
}, [is_loaded])

  useEffect(() => {
    if (is_edit && !_post && preview) {
      console.log("포스트 정보가 없어요! ㅜㅜ");
      history.goBack();
      return;
    }

    if (is_edit) {
      dispatch(imageActions.setPreview(_post[0]?.img_url));
    }
  }, []);

  const addPost = () => {
    setIsLoaded(true);
    dispatch(postActions.addPostAxios(input));
  };

  const editPost = () => {
    setIsLoaded(true);
    dispatch(postActions.updatePostAxios(post_id, { contents: input, img_url: preview }));
  };


  if (!is_token) {
    return (
      <NonFlexBox>
        <Text>
          앗 잠깐!
        </Text>
        <Text>로그인 후에만 글을 쓸 수 있어요!</Text>
        <Button
          _onClick={() => {
            history.replace("/login");
          }}
        >
          로그인 하러 가기!
        </Button>
      </NonFlexBox>
    );
  }

  return (
    <div className="px-1">
      
      <NonGrid>
        <div className="flex flex-wrap text-3xl my-2">{is_edit ? "Edit" : "Write"}
        </div>
        {!is_edit && <Upload />}
        </NonGrid>

      <div className="flex flex-col px-4">
        <PostText>{input}</PostText>
        <Image
          shape="big_square"
          src={
            preview
              ? preview
              : "https://user-images.githubusercontent.com/75834421/124501682-fb25fd00-ddfc-11eb-93ec-c0330dff399b.jpg"
          }
        />
      </div>

      <NonFlexBox>
        <Input
          textarea
          value={input}
          placeholder="이미지를 표현하는 문장을 적어주세요!"
          _onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        {is_edit ? (
          <Button
            _onClick={editPost}
            _disabled={!preview || input === "" ? true : false}
          >
            게시글 수정
          </Button>
        ) : (
          <Button
            _onClick={addPost}
            _disabled={!preview || input === "" ? true : false}
          >
            게시글 작성
          </Button>
        )}
      </NonFlexBox>
      {is_loaded && <Intro />}
    </div>
  );
};

export default WritePost;