import usePost from "./usePostData";
import useStore from "./useStore";
const useEmails = ({ pageNum, emailsType }) => {
  const {
    userInfo: { email },
  } = useStore();
  return usePost("/mail/recive", { email, pageNum, emailsType });
};

export default useEmails;
