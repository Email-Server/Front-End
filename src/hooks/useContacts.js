import usePostData from "./usePostData";
import useStore from "./useStore";
import { useLocation } from "react-router-dom";
const useContacts = () => {
  const location = useLocation();
  const {
    userInfo: { email },
  } = useStore();

  return usePostData("/contacts/get", { email }, [location]);
};

export default useContacts;
