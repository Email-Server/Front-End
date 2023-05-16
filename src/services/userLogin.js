import postData from "./postUserData";

const useLogin = (body) => {
  return postData("/auth/login", body);
};

export default useLogin;
