import postRequest from "./postRequest";

const schedulerRequest = (body) => {
  return postRequest("/schedule/send", body);
};

export default schedulerRequest;
