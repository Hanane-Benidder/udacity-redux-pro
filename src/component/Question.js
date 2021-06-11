import React, { Component } from "react";
import { connect } from "react-redux";
import { handlepercentage } from "../utils/api";
import { handleAddAnswer } from "../actions/answers";
import { Redirect } from "react-router-dom";
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
      return <Redirect to="/notFound" />;
    }

    const { question, vote, authorAvatar, loginUser } = this.props;

    const totalVotes = ["optionOne", "optionTwo"].reduce(
      (total, option) => total + question[`${option}Votes`].length,
      0
    );

    return (
      <div className="root">
        <h1>Would You Rather</h1>
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
                  <span>{question[`${option}Text`]}</span>
                ) : (
                  <div>
                    <div className="result">
                      <small>{question[`${option}Text`]}</small>

                      <small className="percentage">
                        {handlepercentage(voteCount, totalVotes)}% ({voteCount})
                      </small>
                    </div>
                    <div className="small">
                      
                      {question[`${option}Votes`].includes(loginUser) &&
                      question[`${option}Votes`].indexOf(loginUser) !== -1 ? (
                        <small>Your Choice</small>
                      ) : (
                        false
                      )}
                    </div>
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
  };
}

export default connect(mapStateToProps)(Question);
