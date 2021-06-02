import React, { Component } from "react";
import { connect } from "react-redux";
import { handlepercentage } from "../utils/api";
import { handleAddAnswer } from "../actions/answers";
import "./Question.css";
class Question extends Component {
  handleAnswer = (answer) => {
    const { question, loginUser } = this.props;
    this.answered = true;
    console.log("this is answer ", answer);
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
      return <p>ERROR ,This question does not exist.</p>;
    }

    const { question, authorAvatar, loginUser, users } = this.props;

    const totalVotes = ["optionOne", "optionTwo"].reduce(
      (total, option) => total + question[`${option}`].votes.length,
      0
    );
    {
      console.log(totalVotes);
    }
    return (
      <div className="root">
        <h2>Would You Rather</h2>
        <div>
          <img src={authorAvatar} />
        </div>

        <ul>
          {["optionOne", "optionTwo"].map((option) => {
            const voteCount = question[`${option}`].votes.length;
            const vote = ["optionOne", "optionTwo"].reduce((vote, option) => {
              if (vote !== null) {
                return vote;
              }
              return question[`${option}`].votes.includes(loginUser)
                ? option
                : vote;
            }, null);

            return (
              <li
                className="question"
                onClick={() => {
                  if (vote === null && !this.answered) {
                    this.handleAnswer(option);
                  }
                }}
                key={option}
              >
                {vote === null && !this.answered ? (
                  <span>{question[`${option}`].text}</span>
                ) : (
                  <div>
                    <h5>{question[`${option}`].text}</h5>
                    <h5>
                      {handlepercentage(voteCount, totalVotes)}% ({voteCount})
                    </h5>
                  </div>
                )}
                {/* {console.log(question[`${option}`].text)}*/}
                {/* {console.log(loginUser)} */}
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

  return {
    question,
    users,
    loginUser,
    authorAvatar: users[question.author].avatarURL,
  };
}

export default connect(mapStateToProps)(Question);
