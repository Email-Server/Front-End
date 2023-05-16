import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import EmailList from "./components/EmailList/EmailList";
import Mail from "./components/Mail/Mail";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { Toaster } from "react-hot-toast";
import LoginReq from "./Protected-Routes/LoginReq";
import LoginNotReq from "./Protected-Routes/LoginNotReq";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <LoginReq>
      <App />
      // </LoginReq>
    ),
    children: [
      { index: true, element: <EmailList /> },
      { path: "/mail", element: <Mail /> },
    ],
  },
  {
    path: "/login",
    element: (
      <LoginNotReq>
        <LogIn />
      </LoginNotReq>
    ),
  },
  {
    path: "/signUp",
    element: (
      <LoginNotReq>
        <SignUp />
      </LoginNotReq>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <React.StrictMode>
      <RouterProvider router={router} />
      <Toaster />
    </React.StrictMode>
  </React.StrictMode>
);
