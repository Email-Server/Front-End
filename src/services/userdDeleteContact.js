import postRequest from "./postRequest";

const userdDeleteContact = (body) => {
  return postRequest("/contacts/remove", body);
};

export default userdDeleteContact;
