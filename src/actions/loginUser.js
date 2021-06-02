export const LOGOUT_USER = "LOGOUT_USER";
export const LOGIN_USER = "LOGIN_USER";
export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}
export function setLoginUser(id) {
  return {
    type: LOGIN_USER,
    id,
  };
}
