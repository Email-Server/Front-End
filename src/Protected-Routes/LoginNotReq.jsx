import { Navigate } from "react-router-dom";
import useStore from "../hooks/useStore";

const LoginReq = ({ children }) => {
  const { login } = useStore();

  return !login ? children : <Navigate to={"/"} />;
};

export default LoginReq;
