import { RECEIVE_USERS } from "../actions/users";
import { ADD_ANSWER } from "../actions/answers";
import { ADD_QUESTION } from "../actions/questions";
export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_QUESTION:
      const question = action.question;
      const { id, author } = question;
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat([id]),
        },
      };
    case ADD_ANSWER:
      const user = state[action.loginUser];

      return {
        ...state,
        [action.loginUser]: {
          ...user,
          answers: user.answers.concat([action.qid]),
        },
      };

    default:
      return state;
  }
}
