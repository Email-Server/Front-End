import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DuoIcon from "@mui/icons-material/Duo";
import InboxIcon from "@mui/icons-material/Inbox";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import NearMeIcon from "@mui/icons-material/NearMe";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import StarIcon from "@mui/icons-material/Star";
import { Button, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useComposeModal from "../../hooks/useComposeModa";
import GroupsIcon from "@mui/icons-material/Groups";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
function Sidebar({ emails, emailsType, setEmailsType }) {
  const composeModal = useComposeModal();
  const navigate = useNavigate();

  return (
    <div className="pl-2 sidebar">
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
        Icon={GroupsIcon}
        title="Scheduler"
        selected={emailsType.isScheduler === true}
        onClick={() => {
          setEmailsType({ isScheduler: true });
          navigate("/scheduler");
        }}
      />
      <SidebarOption
        Icon={CalendarMonthIcon}
        title="calendar"
        selected={emailsType.isCalender === true}
        onClick={() => {
          setEmailsType({ isCalender: true });
          navigate("/calendar");
        }}
      />

      <SidebarOption
        Icon={PersonIcon}
        title="Contacts"
        selected={emailsType.isContacts === true}
        onClick={() => {
          setEmailsType({ isContacts: true });
          navigate("/contacts");
        }}
      />

      {/* <div className="sidebar-footer">
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
      </div> */}
    </div>
  );
}

export default Sidebar;
