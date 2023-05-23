import usePostData from "./usePostData";

const useReceiveScheduler = (email) => {
  return usePostData("/schedule/receive", { email });
};

export default useReceiveScheduler;
