import { useState } from "react";
import "./SendMail.css";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import useComposeModal from "../../hooks/useComposeModa";
import useStore from "../../hooks/useStore";
import userSendEmail from "../../services/userSendEmail";
import Loading from "./../Loading/Loading";
import { toast } from "react-hot-toast";
import SendIcon from "@mui/icons-material/Send";
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
            onChange={(e) => setEmailTo(e.target.value)}
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
          </div>
        </form>
        {loading && <Loading />}
      </div>
    </div>
  );
}

export default SendMail;
