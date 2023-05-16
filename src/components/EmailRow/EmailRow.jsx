import { Checkbox, IconButton } from "@mui/material";
import { useState } from "react";
import "./EmailRow.css";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import LabelImportantOutlinedIcon from "@mui/icons-material/LabelImportantOutlined";
import { Await, useNavigate } from "react-router-dom";
import emailStatusUpdate from "../../services/emailStatusUpdate";
function EmailRow({
  id,
  isStarred,
  isImportant,
  isRead,
  subject,
  description,
  time,
}) {
  const navigate = useNavigate();
  const [started, setStarted] = useState(isStarred);
  const [important, setImportant] = useState(isImportant);
  const [Read, setRead] = useState(isRead);

  const openMail = async () => {
    if (!isRead) {
      emailStatusUpdate(id, { isRead: true }).then(() => {
        setRead(true);
        navigate("/mail/" + id);
      });
    } else {
      navigate("/mail/" + id);
    }
  };

  const starControl = () => {
    if (started) {
      emailStatusUpdate(id, { isStarred: false }).then(() => {
        setStarted(false);
      });
    } else {
      emailStatusUpdate(id, { isStarred: true }).then(() => {
        setStarted(true);
      });
    }
  };
  const importantControl = () => {
    if (important) {
      emailStatusUpdate(id, { isImportant: false }).then(() => {
        setImportant(false);
      });
    } else {
      emailStatusUpdate(id, { isImportant: true }).then(() => {
        setImportant(true);
      });
    }
  };

  return (
    <div className="emailRow">
      <div className="emailRow-options">
        <Checkbox />
        <IconButton onClick={starControl}>
          {started ? (
            <StarIcon htmlColor="#f7cb69" />
          ) : (
            <StarBorderOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={importantControl}>
          <LabelImportantOutlinedIcon htmlColor={important && "#1a73e8"} />
        </IconButton>
      </div>

      <div className="h-full emailRow-message" onClick={openMail}>
        <h4 className={!Read && "font-bold"}>
          {subject}{" "}
          <span className="emailRow-description"> - {description}</span>
        </h4>
      </div>
      <p className="emailRow-time">{time}</p>
    </div>
  );
}

export default EmailRow;
