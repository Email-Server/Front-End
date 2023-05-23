import postRequest from "./postRequest";

const scheduleApprove = (body) => {
  return postRequest("/schedule/approve", body);
};

export default scheduleApprove;
