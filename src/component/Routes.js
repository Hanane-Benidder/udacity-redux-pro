import { React, Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
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
        <PrivateRoute path="/add" exact component={newQuestion}></PrivateRoute>
        <Route path="notFound" component={notFound} />
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
