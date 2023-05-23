import postRequest from "./postRequest";

const scheduleRemove = (body) => {
  return postRequest("/schedule/remove", body);
};

export default scheduleRemove;
