import { useEffect } from "react";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Loading from "./../Loading/Loading";
import CloseIcon from "@mui/icons-material/Close";
import userControlContact from "../../services/userControlContact";
import useStore from "../../hooks/useStore";
const AddContactModal = ({
  updateContact,
  onClose,
  isOpened,
  setFilter,
  setUpdateContact,
}) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setName(updateContact.name || "");
    setEmail(updateContact.email || "");
  }, [updateContact]);
  const {
    userInfo: { email: userEmail },
  } = useStore();
  useEffect(() => {
    if (isOpened) {
      setShow(true);
    }
  }, [isOpened]);

  const handleClose = useCallback(() => {
    onClose(false);
    setTimeout(() => {
      setShow(false);
    }, 300);
  }, [onClose]);

  const submitHandler = (e) => {
    e.preventDefault();
    let endpoint = "/contacts/add";
    let toastMessage = "Contact Added Successfully";
    let updateState = updateContact.name;
    if (updateState) {
      endpoint = "/contacts/edit";
      toastMessage = "Contact Updated Successfully";
    }
    setLoading(true);
    const data = {
      userEmail: userEmail,
      contactName: name,
      contactEmail: email,
    };
    userControlContact(endpoint, data)
      .then((res) => {
        if (
          res.data === "contact has been added successfully!" ||
          res.data === "contact has been updated successfully!"
        ) {
          if (updateState) {
            updateLocalContact();
          } else {
            addLocalContact();
          }
          setUpdateContact({});
          setLoading(false);
          toast.success(toastMessage);
          handleClose();
        } else if (res.data === "user already exists") {
          setLoading(false);
          toast.error("Email already Added");
        } else {
          toast.error("Some thing went wrong");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data);
        if (err.response.data === "no user with that contactEmail")
          toast.error("no user with that contactEmail");
        else toast.error("Some thing went wrong");
      });
  };

  const updateLocalContact = () => {
    setFilter((prev) => {
      const newContacts = prev.map((value) => {
        if (value.name == updateContact.name) {
          value.name = name;
          value.email = email;
        }
        return value;
      });
      return newContacts;
    });
  };

  const addLocalContact = () => {
    setFilter((prev) => {
      const newContacts = [...prev, { name: name, email: email }];
      return newContacts;
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center h-screen   bg-neutral-300/70
        ${isOpened ? "flex" : "hidden"}
      `}
    >
      <form
        onSubmit={submitHandler}
        className={`
             translate duration-300  relative max-w-xl p-6 bg-white rounded-lg shadow-md w-2/3 
              ${show ? "translate-y-0" : "translate-y-full"}
              ${show ? " opacity-100" : " opacity-0"}`}
      >
        <span
          className="absolute w-10 h-10 px-2 py-1 font-semibold text-gray-800 rounded-full cursor-pointer bg-black-300 top-4 right-2 hover:bg-gray-200"
          onClick={handleClose}
        >
          <CloseIcon />
        </span>
        <h2 className="mb-2 text-2xl font-semibold">Add Contact</h2>

        <div className="w-full py-4 my-6 body ">
          <div className="flex flex-col items-start mb-6 input">
            <label htmlFor="" className="mb-3 font-bold capitalize ">
              Name
            </label>
            <input
              type="text"
              required
              placeholder="Enter the name"
              className="w-full p-4 rounded-md focus:outline-neutral-400 border-neutral-300  border-[1px]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start input">
            <label htmlFor="" className="mb-3 font-bold capitalize ">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="Enter the Email"
              className="w-full p-4 rounded-md focus:outline-neutral-400 border-neutral-300  border-[1px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <button
          className={`w-full p-4 my-4 text-lg font-semibold text-white bg-green-700 rounded-md text-whit hover:bg-green-800
            ${loading && "bg-green-500"}
          `}
          type="submit"
        >
          {loading
            ? "Loading..."
            : updateContact.name
            ? "Update Contact"
            : "Add Contact"}
        </button>
      </form>
      {loading && <Loading />}
    </div>
  );
};

export default AddContactModal;
