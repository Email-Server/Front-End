import apiClient from "./api-client";
const postData = (endPoint, body) => {
  const controller = new AbortController();
  const res = apiClient.post(endPoint, body, { signal: controller.signal });
  return res;
};

export default postData;
