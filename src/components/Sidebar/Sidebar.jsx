import { Button, IconButton } from "@mui/material";
import React from "react";
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

function Sidebar({ emails, emailsType, setEmailsType }) {
  const composeModal = useComposeModal();

  return (
    <div className="sidebar">
      <Button
        className="sidebar-compose"
        onClick={composeModal.toggle}
        startIcon={<AddIcon fontSize="large" />}
      >
        Compose
      </Button>
      <Link to="/" className="sidebar-link">
        <SidebarOption
          Icon={InboxIcon}
          title="Inbox"
          number={emails.length}
          selected={true}
        />
      </Link>

      <SidebarOption
        Icon={StarIcon}
        title="Starred"
        number={12}
        onClick={() => {
          setEmailsType("starred");
        }}
      />
      <SidebarOption
        Icon={AccessTimeIcon}
        title="Snoozed"
        number={9}
        onClick={() => {
          setEmailsType("snoozed");
        }}
      />
      <SidebarOption
        Icon={LabelImportantIcon}
        title="Important"
        number={12}
        onClick={() => {
          setEmailsType("important");
        }}
      />
      <SidebarOption
        Icon={NearMeIcon}
        title="Sent"
        number={81}
        onClick={() => {
          setEmailsType("send");
        }}
      />
      <SidebarOption
        Icon={NoteIcon}
        title="Drafts"
        number={5}
        onClick={() => {
          setEmailsType("drafts");
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
