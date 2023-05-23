import postRequest from "./postRequest";

const scheduleIgnore = (body) => {
  return postRequest("/schedule/ignore", body);
};

export default scheduleIgnore;
