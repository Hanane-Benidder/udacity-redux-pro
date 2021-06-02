import { saveQuestionAnswer } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

export const ADD_ANSWER = "ADD_ANSWER ";

function addAnswer({ loginUser, answer, qid }) {
  return {
    type: ADD_ANSWER,
    loginUser,
    answer,
    qid,
  };
}
export function handleAddAnswer(info) {
  return (dispatch) => {
    dispatch(showLoading());
    // console.log("info", info);
    return saveQuestionAnswer(info)
      .then(() => dispatch(addAnswer(info)))
      .then(() => dispatch(hideLoading()));
  };
}
