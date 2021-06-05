import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA.js";

export function isObject(item) {
  return Object.prototype.toString.call(item) === "[object Object]";
}
function flattenQuestion(question) {
  return Object.keys(question).reduce((flattenedQuestion, key) => {
    const val = question[key];

    if (isObject(val)) {
      flattenedQuestion[key + "Text"] = val.text;
      flattenedQuestion[key + "Votes"] = val.votes;
      return flattenedQuestion;
    }

    flattenedQuestion[key] = val;
    return flattenedQuestion;
  }, {});
}

function formatQuestions(questions) {
  const questionIds = Object.keys(questions);

  return questionIds.reduce((formattedQuestions, id) => {
    formattedQuestions[id] = flattenQuestion(questions[id]);
    return formattedQuestions;
  }, {});
}

function formatUsers(users) {
  return Object.keys(users).reduce((formattedUsers, id) => {
    const user = users[id];

    formattedUsers[id] = {
      ...user,
      answers: Object.keys(user.answers),
    };

    return formattedUsers;
  }, {});
}

export function handlepercentage(count, total) {
  return total === 0 ? 0 : parseInt((count / total) * 100, 10);
}
export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users: formatUsers(users),
      questions: formatQuestions(questions),
    })
  );
}

export function saveQuestion(question) {
  return _saveQuestion(question).then((q) => flattenQuestion(q));
}

export function saveQuestionAnswer(args) {
  return _saveQuestionAnswer(args);
}
