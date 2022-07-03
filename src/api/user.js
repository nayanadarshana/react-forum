import Request from "./Request";

const USERS_ENDPOINT = "/users";

const UsersAPI = {
  getUser: new Request(`${USERS_ENDPOINT}/userProfile`).get,
  registerUser: new Request(`${USERS_ENDPOINT}/register`).post,
  authenticateUser: new Request(`${USERS_ENDPOINT}/authenticate`).post,
  logout: new Request(`${USERS_ENDPOINT}/logout`).post,
};

export default UsersAPI;
