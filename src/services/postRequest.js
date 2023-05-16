import apiClient from "./api-client";
const postRequest = (endPoint, body) => {
  const controller = new AbortController();
  const res = apiClient.post(endPoint, body, { signal: controller.signal });
  console.log(res);
  return res;
};

export default postRequest;
