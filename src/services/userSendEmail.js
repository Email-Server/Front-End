import postRequest from "./postRequest";

const userSendEmail = (body) => {
  return postRequest("/mail/send", body);
};

export default userSendEmail;
