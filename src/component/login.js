import React, { Component } from "react";
import "./Login.css";
import { users } from "../utils/_DATA";
import { Redirect } from "react";
import { setLoginUser } from "../actions/loginUser";
import { connect } from "react-redux";

class loginPage extends Component {
  state = {
    userId: "",
    mainpage: false,
  };

  handleselection = (event) => {
    this.setState(() => ({
      userId: event.target.value,
    }));
  };
  handlelogin = (event) => {
    const { userId } = this.state;
    const { dispatch, loginUser } = this.props;
    event.preventDefault();
    this.setState(() => {
      this.props.dispatch(setLoginUser(this.state.userId));
    });
  };

  render() {
    const { userId, mainpage } = this.state;
    const photo = "https://clipground.com/images/redux-logo-8.jpg";

    return (
      <div className="parentdiv">
        <h3> Welcome to Would You Rather App!</h3>
        <img src={photo} />
        <form onSubmit={this.handlelogin}>
          {console.log("cliked user " + userId)}
          <select
            className="btn"
            value={this.state.userId}
            onChange={this.handleselection}
          >
            <option value="" disabled defaultValue hidden>
              Choose A User
            </option>

            {Object.keys(users).map((user) => {
              return (
                <option value={users[user].id} key={user}>
                  {users[user].name}
                </option>
              );
            })}
          </select>
          <button className="btn" type="submit" disabled={userId === ""}>
            login
          </button>
        </form>
      </div>
    );
  }
}
function mapStateToProps({ users, loginUser }) {
  return {
    users: Object.keys(users),
    loginUser,
  };
}
export default connect(mapStateToProps)(loginPage);
