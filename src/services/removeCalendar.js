import postRequest from "./postRequest";

const removeCalendar = (calendarId) => {
  return postRequest("/calendar/remove", { calendarId });
};

export default removeCalendar;
