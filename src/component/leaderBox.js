import React from "react";
import "./leaderBox.css";
import { connect } from "react-redux";

const leaderBox = () => {
  const {users , userIds } = this.props
  
  const leaderboard = userIds.map((id) => ({
    id,
    points:
      Object.keys(users[id].answers).length +
      Object.keys(users[id].questions).length,
  }));
  return (
    <div className="root">
      <h1>Leaderboard</h1>

      {leaderboard
        .sort((a, b) => b.points - a.points)
        .map((user) => (
          <div key={user.id}>
            <div className="avatar-holder">
              <img src={users[user.id].avatarURL} />
              <h3 className="author">
                {`${users[user.id].name}`} <small>({user.points} pts)</small>
              </h3>

              <p>
                Questions answered: {Object.keys(users[user.id].answers).length}
              </p>
              <p>
                Questions asked: {Object.keys(users[user.id].questions).length}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

function mapStateToProps({ users }) {
  
  return {
    userIds : Object.keys(users),
    users
  };
}
export default connect(mapStateToProps)(leaderBox);
