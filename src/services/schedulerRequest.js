import postRequest from "./postRequest";

const schedulerSendRequest = (body) => {
  return postRequest("/schedule/send", body);
};

export default schedulerSendRequest;
