import postRequest from "./postRequest";

const useSignUp = (body) => {
  return postRequest("/auth/register", body);
};

export default useSignUp;
