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
    //수정 페이지에서 새로고침을 하면 rerendering이 되면서 reducer의
    // store안의 내용물이 사라진다..그래서 주소창에 post의 id값은 있지만(is_edit)
    // post는 없는 경우가 되므로 그때는 그냥 강제뒤로가기! 그러고 나서 끝나야 되므로
    // return! (여기서 return 안하면 밑에 것도 수행되면서 is_edit은 있고 post는 없는데
    //image_url 찾는다면서 오류발생!)
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