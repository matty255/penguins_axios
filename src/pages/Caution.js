import React from "react";
import { Text, Button, NonFlexBox } from "../elements";

import { history } from "../redux/configureStore";

const Caution = () => {
  return (
    <NonFlexBox>
      <Text>
        앗 잠깐!
      </Text>
      <Text>로그인 후에만 이용 할 수 있어요!</Text>
      <Button
        _onClick={() => {
          history.replace("/login");
        }}
      >
        로그인 하러 가기!
      </Button>
    </NonFlexBox>
  );
};

export default Caution;
