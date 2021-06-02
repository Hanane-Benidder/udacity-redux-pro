import React, { Component } from "react";
import { connect } from "react-redux";
import "./newQuestion.css";
import { addingQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";
class AddQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    toHome: false,
  };

  handleInput = (e) => {
    const { value, name } = e.target;

    this.setState(() => ({
      [name]: value,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.dispatch(addingQuestion(this.state));
    this.setState(() => ({
      toHome: true,
    }));
  };

  render() {
    const { optionOneText, optionTwoText, toHome } = this.state;
    if (toHome === true) {
      return <Redirect to="/" />;
    }
    return (
      <form className="container" onSubmit={this.handleSubmit}>
        <h1>Would You Rather</h1>

        <label className="label" htmlFor="optionOne">
          The Option One
        </label>
        <input
          value={optionOneText}
          onChange={this.handleInput}
          name="optionOneText"
          className="input"
          type="text"
          required
        />
        <br />
        <label className="label" htmlFor="optionTwo">
          The Option Two
        </label>
        <input
          value={optionTwoText}
          onChange={this.handleInput}
          name="optionTwoText"
          className="input"
          type="text"
          required
        />
        <button
          type="submit"
          disabled={optionOneText === "" && optionTwoText === ""}
        >
          Add Question
        </button>
      </form>
    );
  }
}

export default connect()(AddQuestion);
