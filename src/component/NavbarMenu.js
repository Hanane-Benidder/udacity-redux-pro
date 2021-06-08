import React, { Component } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setLoginUser } from "../actions/loginUser";

import "./NavbarMenu.css";

class NavbarMenu extends Component {
  logout = () => {
    this.props.dispatch(setLoginUser(null));
  };
  render() {
    return (
      <header>
        <img src="https://th.bing.com/th/id/OIP.QpZ9ttlHb0duHJ3nyUEKrQHaGJ?w=216&h=180&c=7&o=5&pid=1.7"></img>
        <nav>
          <ul id="nav">
            <li className="list">
              <NavLink to="/" exact>
                <strong>Home</strong>
              </NavLink>
            </li>
            <li className="list">
              <NavLink to="/add" exact>
                <strong>New Question</strong>
              </NavLink>
            </li>
            <li className="list">
              <NavLink to="/leaderboard" exact>
                <strong>LeaderBoard</strong>
              </NavLink>
            </li>
            <li className="list">
              <h4>
                <strong>{this.props.avatarName}</strong>
              </h4>
            </li>
            <li className="list">
              <img className="userId" src={this.props.avatarURL} />
            </li>

            <li className="lastli">
              <NavLink to="/" onClick={this.logout}>
                <strong>Logout</strong>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
function mapStateToProps({ users, loginUser }) {
  const avatarURL = users[loginUser].avatarURL;
  const avatarName = users[loginUser].name;
  return {
    avatarName,
    loginUser,
    avatarURL,
  };
}
export default connect(mapStateToProps)(NavbarMenu);
