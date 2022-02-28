import React, { useRef, useState, useEffect } from "react";
import { Input, Button, Intro } from "../elements";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";

const Upload = (props) => {
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.image.uploading);
  const fileInput = useRef();
  const [fileName, setFileName] = useState("");
  // let [ is_loaded, setIsLoaded ] = useState(false);

  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    // 파일 내용을 읽어옵니다.
    reader.readAsDataURL(file);
 
    // 읽기가 끝나면 발생하는 이벤트 핸들러예요! :)
    reader.onloadend = () => {
      // reader.result는 파일의 컨텐츠(내용물)입니다!
      // setIsLoaded(true);
      dispatch(imageActions.setPreview(reader.result));
    };
    setFileName(e.target.value.split("\\")[2]);
  };

  // useEffect((is_loaded)=>{
  //   setTimeout(()=>{ setIsLoaded(false) }, 2000);
  // }, [is_loaded]);

  return (
    
    <>
      <div className="flex p-2">
        <Input
          width="100%"
          type="text"
          placeholder="사진을 선택해주세요!"
          value={fileName}
          margin="0"
          disabled={true}
        />
        <Button>
          <label htmlFor="file">파일 찾기</label>
        </Button>
        <input
          id="file"
          ref={fileInput}
          type="file"
          style={{ display: "none" }}
          disabled={uploading}
          onChange={selectFile}
        />
      </div>
      {/* {is_loaded && <Intro />} */}
    </>
  );
};

export default Upload;
