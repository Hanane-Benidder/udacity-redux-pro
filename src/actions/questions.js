import { hideLoading, showLoading } from "react-redux-loading";
import { saveQuestion } from "../utils/api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION ";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}
function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}
export function addingQuestion(question) {
  return (dispatch, getState) => {
    const { loginUser } = getState();
    dispatch(showLoading());
    return saveQuestion({
      ...question,
      author: loginUser,
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
}
