import React, { Component } from "react";
import { Link } from "react-router-dom";
import Question from "./Question";
import { connect } from "react-redux";
import "./dashboard.css";

class dashboard extends Component {
  state = {
    selectedAnswer: false,
  };

  handleAnswered = () => {
    this.setState(() => ({
      selectedAnswer: true,
    }));
  };
  handleUnanswered = () => {
    this.setState(() => ({
      selectedAnswer: false,
    }));
  };
  render() {
    const { selectedAnswer } = this.state;
    const { answered, unanswered, users } = this.props;
    const pageList = selectedAnswer === true ? answered : unanswered;
    return (
      <div>
        <div>
          <button className="button" onClick={this.handleUnanswered}>
            <strong>Unanswered</strong>
          </button>

          <button className="button" onClick={this.handleAnswered}>
            <strong>Answered</strong>
          </button>
        </div>
        <ul>
          {pageList.map((question) => (
            <li className="listquestion" key={question.id}>
              <Link to={`questions/${question.id}`}>
                <h3>would you rather</h3>

                <img src={users[question.author].avatarURL} />
                <p>
                  <strong>{`Asked by ${question.author}`}</strong>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
function mapStateToProps({ loginUser, questions, users }) {
  const answers = users[loginUser].answers;
  const authorAvatar = users[loginUser].avatarURL;

  const answered = answers
    .map((id) => questions[id])
    .sort((a, b) => b.timestamp - a.timestamp);

  const unanswered = Object.keys(questions)
    .filter((id) => !answers.includes(id))
    .map((id) => questions[id])
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    answered,
    unanswered,
    users,
  };
}
export default connect(mapStateToProps)(dashboard);
