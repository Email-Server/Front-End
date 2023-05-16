import apiClient from "./api-client";
const patchRequest = (endPoint, body) => {
  const controller = new AbortController();
  const res = apiClient.patch(endPoint, body, { signal: controller.signal });

  return res;
};

export default patchRequest;
