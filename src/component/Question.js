import React, { Component } from "react";
import { connect } from "react-redux";
import { handlepercentage } from "../utils/api";
import { handleAddAnswer } from "../actions/answers";
import "./Question.css";

class Question extends Component {
  handleAnswer = (answer) => {
    const { question, loginUser } = this.props;
    this.answered = true;

    this.props.dispatch(
      handleAddAnswer({
        loginUser,
        answer,
        qid: question.id,
      })
    );
  };

  render() {
    if (this.props.question === null) {
      return <p>Errors. This question does not exist.</p>;
    }

    const { question, vote, authorAvatar, userVote } = this.props;

    const totalVotes = ["optionOne", "optionTwo"].reduce(
      (total, option) => total + question[`${option}Votes`].length,
      0
    );

    return (
      <div className="root">
        <h1 className="question">Would You Rather</h1>
        <div className="question-author">
          <img src={authorAvatar} alt="Author's avatar" />
        </div>

        <ul>
          {["optionOne", "optionTwo"].map((option) => {
            const voteCount = question[`${option}Votes`].length;

            return (
              <li
                onClick={() => {
                  if (vote === null && !this.answered) {
                    this.handleAnswer(option);
                  }
                }}
                key={option}
                className="question"
              >
                {vote === null ? (
                  question[`${option}Text`]
                ) : (
                  <div className="result">
                    <small>{userVote}</small>
                    <span>{question[`${option}Text`]}</span>
                    <span>
                      {handlepercentage(voteCount, totalVotes)}% ({voteCount})
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ loginUser, questions, users }, { match }) {
  const { id } = match.params;
  const question = questions[id];
  const userVote = users[loginUser].answers[question.id];
  if (!question) {
    return {
      question: null,
    };
  }

  const vote = ["optionOne", "optionTwo"].reduce((vote, option) => {
    if (vote !== null) {
      return vote;
    }

    return question[`${option}Votes`].includes(loginUser) ? option : vote;
  }, null);

  return {
    question,
    vote,
    loginUser,
    authorAvatar: users[question.author].avatarURL,
    userVote,
  };
}

export default connect(mapStateToProps)(Question);
