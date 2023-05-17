import usePostData from "./usePostData";

const useScheduler = (email) => {
  return usePostData("/schedule/receive", { email });
};

export default useScheduler;
