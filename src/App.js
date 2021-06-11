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
export default connect(mapStateToProps)(App);
