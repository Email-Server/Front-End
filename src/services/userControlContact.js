import postRequest from "./postRequest";

const userControlContact = (endpoint, body) => {
  return postRequest(endpoint, body);
};

export default userControlContact;
