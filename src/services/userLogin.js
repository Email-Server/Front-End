import postRequest from "./postRequest";

const userLogin = (body) => {
  return postRequest("/auth/login", body);
};

export default userLogin;
