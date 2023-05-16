import postUserData from "./postUserData";

const useSignUp = (body) => {
  return postUserData("/auth/register", body);
};

export default useSignUp;
