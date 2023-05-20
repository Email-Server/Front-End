import moment from "moment";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useCalendar from "../../hooks/useCalendar";
import EventModal from "../EventModal/EventModal";
import useStore from "./../../hooks/useStore";
import { Skeleton } from "@mui/material";
const CalendarPage = () => {
  const {
    userInfo: { email },
  } = useStore();

  // fetch user calendar info
  const { data, setData, loading } = useCalendar(email);
  const [eventDetails, setEventDetails] = useState({});
  const [isOpened, setIsOpened] = useState(false);

  const localizer = momentLocalizer(moment);

  const handleSelectedEvent = (event) => {
    setEventDetails(event);
    setIsOpened(true);
  };
  const skeletonArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];

  return (
    <>
      {loading ? (
        <div className="grid w-full grid-cols-6 gap-4 p-6 h-fit ">
          {skeletonArray.map((item) => (
            <Skeleton variant="rectangular" height={120} key={item} />
          ))}
        </div>
      ) : (
        <div className=" flex-[1] h-[90vh] p-6">
          <Calendar
            localizer={localizer}
            events={data}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={handleSelectedEvent}
            views={["month", "week", "day"]}
          />
        </div>
      )}
      <EventModal
        data={eventDetails}
        isOpened={isOpened}
        onClose={(value) => setIsOpened(value)}
        setData={setData}
      />
    </>
  );
};

export default CalendarPage;
