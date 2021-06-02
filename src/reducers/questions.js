import { ADD_ANSWER } from "../actions/answers";
import { RECEIVE_QUESTIONS, ADD_QUESTION } from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    case ADD_ANSWER:
      const { answer, qid, loginUser } = action;
      const question = state[qid];
      const voteOption = question[`${answer}`].votes;
      // console.log("this", voteOption);

      // console.log("question", voteOption.concat([loginUser]));
      return {
        ...state,
        [action.qid]: {
          ...question,
          [voteOption]: voteOption.concat([loginUser]),
          // [voteOption]: question[`${answer}`].votes.concat([loginUser]),
        },
      };

    default:
      return state;
  }
}
