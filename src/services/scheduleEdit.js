import postRequest from "./postRequest";

const scheduleEdit = (body) => {
  return postRequest("/schedule/edit", body);
};

export default scheduleEdit;
