import React from "react";

import { Navigate } from "react-router-dom";
import useStore from "../hooks/useStore";

const LoginReq = ({ children }) => {
  const { login } = useStore();

  return login ? children : <Navigate to={"/login"} />;
};

export default LoginReq;
