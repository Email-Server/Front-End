import apiClient from "./api-client";
const postRequest = (endPoint, body) => {
  const res = apiClient.post(endPoint, body);

  return res;
};

export default postRequest;
