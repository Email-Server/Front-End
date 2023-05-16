import usePostData from "./usePostData";
import useStore from "./useStore";
const useEmails = (body) => {
  const {
    userInfo: { email },
  } = useStore();

  return usePostData("/mail/recive", { email, ...body }, [body]);
};

export default useEmails;
