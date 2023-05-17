import React from "react";
import schedulerRequest from "../../services/schedulerRequest";
import useScheduler from "../../hooks/useScheduler";
import useStore from "./../../hooks/useStore";
import { toast } from "react-hot-toast";
const Scheduler = () => {
  const {
    userInfo: { email },
  } = useStore();

  // fetch current Scheduler data
  const { data, loading, error } = useScheduler(email);

  // make Scheduler request
  const schedulerRequestHandler = () => {
    const data = {
      organizerEmail: email,
      attendeeEmail: "example@any.com",
      title: "title",
      start: "05/12/2023",
      end: "05/12/2023, 05:50:52 PM",
      description: "description",
      location: "location",
    };

    schedulerRequest(data)
      .then((res) => {
        console.log(res);
        toast.success("Scheduler request sent successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Scheduler request failed");
      });
  };

  return (
    <div className="flex items-center justify-center flex-[0.7] h-full">
      Scheduler
    </div>
  );
};

export default Scheduler;
