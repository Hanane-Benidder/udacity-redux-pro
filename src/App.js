import "./App.css";
import { Fragment } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import { LoadingBar } from "react-redux-loading";
import Routes from "./component/Routes";
import login from "./component/login";

import React, { Component } from "react";
import { handleInitialData } from "./actions/shared";

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar />

          <Switch>
            {this.props.loginUser === null ? (
              <Route path="/" component={login}></Route>
            ) : (
              <Routes />
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

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => {
      dispatch(handleInitialData());
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
