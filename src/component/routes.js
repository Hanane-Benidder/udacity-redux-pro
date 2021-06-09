import { React, Fragment } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";

import leaderBox from "./leaderBox";
import NavbarMenu from "./NavbarMenu";
import Question from "./Question";
import login from "./login";
import dashboard from "./dashboard";
import newQuestion from "./newQuestion";
import notFound from "./notFound";
function Routes() {
  return (
    <div>
      <Fragment>
        <NavbarMenu />

        <Route path="/" exact component={dashboard}></Route>
        <Route path="/leaderboard" exact component={leaderBox}></Route>

        <Route path="/questions/:id" exact component={Question}></Route>
        <Route path="/add" exact component={newQuestion}></Route>
        <Route path="notFound" component={notFound} />
      </Fragment>
    </div>
  );
}

export default Routes;
