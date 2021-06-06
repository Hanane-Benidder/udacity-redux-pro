import "./App.css";
import { Fragment } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import { LoadingBar } from "react-redux-loading";
import leaderBox from "./component/leaderBox";
import NavbarMenu from "./component/NavbarMenu";
import Question from "./component/Question";
import login from "./component/login";
import dashboard from "./component/dashboard";
import newQuestion from "./component/newQuestion";
import notFound from "./component/notFound";
import React, { Component } from "react";
import { handleInitialData } from "./actions/shared";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar />

          <Switch>
            {this.props.loginUser === null ? (
              <Route path="/" exact component={login}></Route>
            ) : (
              <Fragment>
                <NavbarMenu />

                <Route path="/" exact component={dashboard}></Route>
                <Route path="/leaderboard" exact component={leaderBox}></Route>

                <Route path="/questions/:id" exact component={Question}></Route>
                <Route path="/add" exact component={newQuestion}></Route>
                {/* <Route component={notFound} /> */}
              </Fragment>
            )}
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ loginUser }) {
  return {
    loginUser,
  };
}
export default connect(mapStateToProps)(App);
