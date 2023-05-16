import { Checkbox, IconButton } from "@mui/material";
import "./EmailList.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RedoIcon from "@mui/icons-material/Redo";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardHideIcon from "@mui/icons-material/KeyboardHide";
import SettingsIcon from "@mui/icons-material/Settings";
import InboxIcon from "@mui/icons-material/Inbox";
import PeopleIcon from "@mui/icons-material/People";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Section from "../Section/Section";
import EmailRow from "../EmailRow/EmailRow";
import { Skeleton } from "@mui/material";
import { useOutletContext } from "react-router-dom";
function EmailList() {
  const [{ count, receiver }, loading, error] = useOutletContext();
  console.log(error);
  return (
    <div className="emailList">
      <div className="emailList-settings">
        <div className="emailList-settingsLeft">
          <Checkbox />
          <IconButton>
            <ArrowDropDownIcon />
          </IconButton>
          <IconButton>
            <RedoIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className="emailList-settingsRight">
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
          <IconButton>
            <KeyboardHideIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
      <div className="emailList-sections">
        <Section Icon={InboxIcon} title="Primary" color="red" selected />
        <Section Icon={PeopleIcon} title="Social" color="#1A73E8" />
        <Section Icon={LocalOfferIcon} title="Promotions" color="green" />
      </div>

      <div className="emailList-list">
        {loading ? (
          <>
            <Skeleton animation="wave" height={20} width={"100%"} />
            <Skeleton animation="wave" height={20} width={"90%"} />
            <Skeleton animation="wave" height={20} width={"80%"} />
          </>
        ) : error ? (
          <div className="w-full mx-auto mt-10 text-center">
            <h1>No Emails</h1>
          </div>
        ) : (
          receiver?.map(({ _id, subject, body, timestamp }) => (
            <EmailRow
              id={_id}
              key={_id}
              subject={subject}
              description={body}
              time={new Date(timestamp?.seconds * 1000).toUTCString()}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default EmailList;
