import React, { useEffect } from "react";

import { NonGrid, Button, Title } from "../elements";
import Permit from "../shared/Permit";
import { getCookie } from "../shared/Cookie";

import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import LoyaltyIcon from '@mui/icons-material/Loyalty';
import CancelIcon from '@mui/icons-material/Cancel';



const Header = (props) => {
  const dispatch = useDispatch();
  const is_token = getCookie("token") ? true : false;

  useEffect(() => {
    if (is_token) {
      userActions.loginCheck();
    } else {
      return
    }
  }, []);
  
  if (is_token) {
    return (
      
      <NonGrid>
        <Title _onClick={() => {
              history.push("/");
            }}>
                Penguins
        </Title>
      

          <Button
            _onClick={() => {
              dispatch(userActions.logOut());
              window.location.reload();
            }}
          >
            <CancelIcon /><span className="hidden sm:contents"> 로그아웃</span>
          </Button>


          <div className="fixed bottom-10 right-10 md:top-10 animate-bounce sm:animate-pulse">
            <Permit>
              <Button _onClick={() => history.push("/write")}>
                <LoyaltyIcon /> <span className="hidden lg:contents"> 포스트쓰러가기</span>
              </Button>
            </Permit>
          </div>
      </NonGrid>
    );
  }
  return (
    <NonGrid>
        <Title _onClick={() => {
              window.location.replace("/");
            }}>
                Penguins
        </Title>


    <div className="flex space-x-3 p-4 text-xs sm:text-sm md:text-lg">
        <Button
            _onClick={() => {
              history.push("/signup");
            }}
          >
            회원가입
          </Button>
          <Button
              _onClick={() => {
                history.push("/login");
              }}
            >
              로그인
            </Button>
            </div>
        </NonGrid>
      );
    };

export default Header;
