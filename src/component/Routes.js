import { React, Fragment } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import dashboard from "./dashboard";
import newQuestion from "./newQuestion";
import notFound from "./notFound";
import leaderBox from "./leaderBox";
import NavbarMenu from "./NavbarMenu";
import Question from "./Question";
function Routes() {
  return (
    <div>
      <Fragment>
        <NavbarMenu />
        <Switch>
          <PrivateRoute path="/" exact component={dashboard}></PrivateRoute>
          <PrivateRoute
            path="/leaderboard"
            exact
            component={leaderBox}
          ></PrivateRoute>

          <PrivateRoute
            path="/questions/:id"
            exact
            component={Question}
          ></PrivateRoute>
          <PrivateRoute
            path="/add"
            exact
            component={newQuestion}
          ></PrivateRoute>
          <Route component={notFound} />
        </Switch>
      </Fragment>
    </div>
  );
}
const PrivateRoute = ({ component: Component, loginUser, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      loginUser !== null ? <Component {...props} /> : <Redirect push to="/" />
    }
  />
);

export default Routes;
