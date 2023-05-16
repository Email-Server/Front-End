import patchRequest from "./patchRequest";

const emailStared = (id, body) => {
  return patchRequest("/feedback/msgread/" + id, body);
};

export default emailStared;
