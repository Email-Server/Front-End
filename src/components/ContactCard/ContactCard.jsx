import useComposeModal from "../../hooks/useComposeModa";
import Avatar, { ConfigProvider } from "react-avatar";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import userdDeleteContact from "../../services/userdDeleteContact";
import { toast } from "react-hot-toast";
import useStore from "../../hooks/useStore";
const ContactCard = ({
  name,
  email,
  data,
  setFilter,
  setAddContactModalOpen,
  setUpdateContact,
}) => {
  const {
    userInfo: { email: userEmail },
  } = useStore();
  const composeModal = useComposeModal();
  const deleteHandler = (contactEmail) => {
    if (!window.confirm("Are You Sure ?")) return;
    const body = {
      userEmail,
      contactEmail,
    };
    const newFilter = data.filter((value) => {
      return value.email !== contactEmail;
    });
    setFilter(newFilter);
    toast.promise(userdDeleteContact(body), {
      loading: "Saving...",
      success: <b>contact Deleted</b>,
      error: () => {
        setFilter(data);
        return <b>Something went wrong.</b>;
      },
    });
  };

  return (
    <div className="flex items-center justify-between p-4 border-b-2 ">
      <div className="flex items-center gap-4 left ">
        <Avatar name={name} round={true} size="70" />
        <div className="">
          <div className="font-bold underline ">{name}</div>
          <div className=" text-neutral-500">{email}</div>
        </div>
      </div>
      <div className="flex items-center gap-4 right ">
        <IconButton
          className="flex items-center gap-1 p-2 text-white capitalize bg-green-700 rounded-full shadow-md"
          onClick={() => {
            composeModal.setEmail(email);
            composeModal.toggle();
          }}
        >
          <ForwardToInboxIcon />
        </IconButton>
        <IconButton
          className="p-2 rounded-full shadow-full bg-[#187de2] text-white capitalize flex items-center gap-1  shadow-md"
          onClick={() => {
            setUpdateContact({ name, email });
            setAddContactModalOpen(true);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          className="p-2 text-white capitalize bg-red-400 rounded-full shadow-md "
          onClick={() => deleteHandler(email)}
        >
          <DeleteForeverIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ContactCard;
