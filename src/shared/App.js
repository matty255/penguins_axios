import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import React from "react";
import tw from "tailwind-styled-components";

import { history } from "../redux/configureStore";

import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../components/Header";
import WritePost from "../pages/WritePost";

import Caution from "../pages/Caution";
import NotFound from "../components/NotFound";

const Container = tw.div`
  w-full bg-yellow-300 -m-3 mx-auto h-full border-b-8
  border-yellow-300 shadow-md
`;

function App() {

  return (
    <div className="App">
      <Container>
        <div className="sm:w-4/5 lg:w-3/5 m-auto bg-yellow-200 shadow-md">
          <ConnectedRouter history={history}>
            <Header />
            <Route exact path="/" component={PostList} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/write" component={WritePost} />
            <Route exact path="/write/:id" component={WritePost} />
            <Route exact path="/caution" component={Caution} />
            <Route component={NotFound} />
          </ConnectedRouter>
          </div>
      </Container>

    </div>
  );
}



export default App;
