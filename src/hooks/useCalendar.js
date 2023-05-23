import usePostData from "./usePostData";

const useCalendar = (email) => {
  return usePostData("/calendar/get", { email });
};

export default useCalendar;
