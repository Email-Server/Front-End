import React, { useState } from "react";
import "./SendMail.css";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import useComposeModal from "../../hooks/useComposeModa";
import useStore from "../../hooks/useStore";
import userSendEmail from "../../services/userSendEmail";
import Loading from "./../Loading/Loading";
import { toast } from "react-hot-toast";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";
import schedulerSendRequest from "../../services/schedulerRequest";

function SendMail() {
  const composeModal = useComposeModal();
  const { userInfo } = useStore();
  const [loading, setLoading] = useState(false);
  const [emailTo, setEmailTo] = useState(composeModal.email || "");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      userID: userInfo.id,
      from: userInfo.email,
      to: emailTo,
      subject: subject,
      body: message,
    };

    setLoading(true);

    userSendEmail(data)
      .then((res) => {
        setLoading(false);
        toast.success("Email Sent Successfully");
        composeModal.toggle();
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error Email Not Sent");
      });
  };

  //////////////
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scheduleDate, setScheduleDate] = useState();
  const [scheduleStartTime, setScheduleStartTime] = useState();
  const [scheduleEndTime, setScheduleEndTime] = useState();
  const [scheduleTitle, setScheduleTitle] = useState();
  const [scheduleDescription, setScheduleDescription] = useState("");
  const [scheduleLocation, setScheduleLocation] = useState("");
  const [toMail, setToMail] = useState();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setScheduleDate();
    setScheduleStartTime();
    setScheduleEndTime();
    setScheduleTitle();
    setScheduleDescription("");
    setScheduleLocation("");
  };

  const scheduleMail = () => {
    if (!scheduleDate || !scheduleStartTime || !scheduleEndTime) {
      toast.error("Please select a valid date and time.");
      return;
    }

    if (!scheduleTitle) return toast.error("Title can't be empty.");

    const scheduledStartDateTime =
      moment(scheduleDate).format("YYYY-MM-DD") +
      " " +
      moment(scheduleStartTime, "HH:mm:ss").format("HH:mm:ss");

    const scheduledEndDateTime =
      moment(scheduleDate).format("YYYY-MM-DD") +
      " " +
      moment(scheduleEndTime, "HH:mm:ss").format("HH:mm:ss");

    // Perform the scheduling request here
    const schedulerRequestHandler = () => {
      setLoading(true);
      const data = {
        organizerEmail: userInfo.email,
        attendeeEmail: toMail.trim(),
        title: scheduleTitle,
        start: scheduledStartDateTime,
        end: scheduledEndDateTime,
        description: scheduleDescription ? scheduleDescription : scheduleTitle,
        location: scheduleLocation ? scheduleLocation : "not assigned",
      };
      schedulerSendRequest(data)
        .then((res) => {
          setLoading(false);
          toast.success("Scheduler request sent successfully");
          composeModal.toggle();
        })
        .catch((err) => {
          setLoading(false);
          toast.error("Scheduler request failed");
        });
    };

    // Call the scheduling function
    schedulerRequestHandler();

    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-screen  w-full  bg-[#0000006E]">
      <div className="z-50 p-1 rounded-lg sendMail">
        <div className="sendMail-header ">
          <h3>New Mail</h3>
          <CloseIcon onClick={composeModal.toggle} className="sendMail-close" />
        </div>

        <form onSubmit={onSubmit}>
          <input
            name="to"
            placeholder="To"
            type="email"
            value={emailTo}
            onChange={(e) => {
              setToMail(e.target.value);
              setEmailTo(e.target.value);
            }}
          />
          <input
            name="subject"
            placeholder="Subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <textarea
            name="message"
            placeholder="Message"
            className="w-full p-4 outline-none resize-none h-52"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div className="sendMail-options">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="flex items-center gap-3 p-2 sendMail-send rounded-xl"
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  <SendIcon size={"12px"} />
                  Send
                </>
              )}
            </Button>
            <Button onClick={openModal} className="sendMail-send-schedule">
              Send Schedule
            </Button>
          </div>
          <Modal
            open={isModalOpen}
            onClose={closeModal}
            sx={{ position: "absolute", top: "20%", left: "38%" }}
          >
            <div
              className="modal-container"
              style={{
                display: "flex",
                flexDirection: "column",
                width: 400,
                height: 400,
                backgroundColor: "#fff",
                padding: 5,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <div>
                <label style={{ marginRight: 10 }}>Title</label>
                <input
                  type="text"
                  value={scheduleTitle}
                  onChange={(e) => {
                    setScheduleTitle(e.target.value);
                  }}
                  label="Select Date"
                  style={styles.input}
                />
              </div>
              <div>
                <label style={{ marginRight: 10 }}>Date</label>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => {
                    setScheduleDate(e.target.value);
                  }}
                  label="Select Date"
                  style={styles.input}
                />
              </div>
              <div>
                <label style={{ marginRight: 10 }}>Start Time</label>
                <input
                  type="time"
                  value={scheduleStartTime}
                  onChange={(e) => {
                    setScheduleStartTime(e.target.value);
                  }}
                  label="Select Time"
                  style={styles.input}
                />
              </div>
              <div>
                <label style={{ marginRight: 10 }}>End Time</label>
                <input
                  type="time"
                  value={scheduleEndTime}
                  onChange={(e) => {
                    setScheduleEndTime(e.target.value);
                  }}
                  label="Select Time"
                  style={styles.input}
                />
              </div>
              <div>
                <label style={{ marginRight: 10 }}>Description</label>
                <input
                  type="text"
                  value={scheduleDescription}
                  onChange={(e) => {
                    setScheduleDescription(e.target.value);
                  }}
                  label="Select Date"
                  style={styles.input}
                />
              </div>
              <div>
                <label style={{ marginRight: 10 }}>Location</label>
                <input
                  type="text"
                  value={scheduleLocation}
                  onChange={(e) => {
                    setScheduleLocation(e.target.value);
                  }}
                  label="Select Date"
                  style={styles.input}
                />
              </div>
              <Button
                onClick={scheduleMail}
                color="primary"
                variant="contained"
              >
                Schedule
              </Button>
            </div>
          </Modal>
        </form>
        {loading && <Loading />}
      </div>
    </div>
  );
}

const styles = {
  input: {
    marginBottom: 10,
    borderWidth: 2,
    padding: 5,
    borderRadius: 5,
    borderColor: "#999",
  },
};

export default SendMail;
