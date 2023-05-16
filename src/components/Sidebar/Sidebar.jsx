import { Button, IconButton } from "@mui/material";

import "./Sidebar.css";
import AddIcon from "@mui/icons-material/Add";
import InboxIcon from "@mui/icons-material/Inbox";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import NearMeIcon from "@mui/icons-material/NearMe";
import NoteIcon from "@mui/icons-material/Note";
import PersonIcon from "@mui/icons-material/Person";
import DuoIcon from "@mui/icons-material/Duo";
import PhoneIcon from "@mui/icons-material/Phone";
import SidebarOption from "./SidebarOption";
import { Link } from "react-router-dom";
import useComposeModal from "../../hooks/useComposeModa";
import { useNavigate } from "react-router-dom";
function Sidebar({ emails, emailsType, setEmailsType }) {
  const composeModal = useComposeModal();
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <Button
        className="sidebar-compose"
        onClick={composeModal.toggle}
        startIcon={<AddIcon fontSize="large" />}
      >
        Compose
      </Button>

      <SidebarOption
        Icon={InboxIcon}
        title="Inbox"
        number={emails.length}
        selected={Object.keys(emailsType).length === 0}
        onClick={() => {
          setEmailsType({});
          navigate("/");
        }}
      />

      <SidebarOption
        Icon={StarIcon}
        title="Starred"
        number={emails.length}
        selected={emailsType.isStarred === true}
        onClick={() => {
          setEmailsType({ isStarred: true });
          navigate("/");
        }}
      />

      <SidebarOption
        Icon={AccessTimeIcon}
        title="Snoozed"
        number={emails.length}
        selected={emailsType.isSnoozed === true}
        onClick={() => {
          setEmailsType({ isSnoozed: true });
          navigate("/");
        }}
      />
      <SidebarOption
        Icon={LabelImportantIcon}
        title="Important"
        number={emails.length}
        selected={emailsType.isImportant === true}
        onClick={() => {
          setEmailsType({ isImportant: true });
          navigate("/");
        }}
      />
      <SidebarOption
        Icon={NearMeIcon}
        title="Sent"
        number={emails.length}
        selected={emailsType.isSend === true}
        onClick={() => {
          setEmailsType({ isSend: true });
          navigate("/");
        }}
      />
      <SidebarOption
        Icon={NoteIcon}
        title="Drafts"
        number={emails.length}
        selected={emailsType.isDraft === true}
        onClick={() => {
          setEmailsType({ isDraft: true });
          navigate("/");
        }}
      />

      <div className="sidebar-footer">
        <div className="sidebar-footerIcons">
          <IconButton>
            <PersonIcon />
          </IconButton>
          <IconButton>
            <DuoIcon />
          </IconButton>
          <IconButton>
            <PhoneIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
