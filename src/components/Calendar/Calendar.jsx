import React from "react";
import removeCalendar from "../../services/removeCalendar";
import useCalendar from "../../hooks/useCalendar";
import useStore from "./../../hooks/useStore";
import { toast } from "react-hot-toast";
const Calendar = () => {
  const {
    userInfo: { email },
  } = useStore();

  // fetch user calendar info
  const { data, loading, error } = useCalendar(email);

  // make Scheduler request
  const removeCalendartHandler = (calendarId) => {
    removeCalendar(calendarId)
      .then((res) => {
        console.log(res);
        toast.success("Calendar removed successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Calendar removal failed");
      });
  };

  return (
    <div className="flex items-center justify-center flex-[0.7] h-full">
      Scheduler
    </div>
  );
};

export default Calendar;
