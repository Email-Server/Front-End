import usePostData from "./usePostData";
import useStore from "./useStore";
import { useLocation } from "react-router-dom";
const useEmails = (body) => {
  const location = useLocation();

  const {
    userInfo: { email },
  } = useStore();
  // console.log(body);
  return usePostData("/mail/recive", { email, isSend: false, ...body }, [
    body,
    location,
  ]);
};

export default useEmails;
