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

function SendMail() {
  const composeModal = useComposeModal();
  const { userInfo } = useStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    console.log(userInfo);
    const data = {
      userID: userInfo.id,
      from: userInfo.email,
      to: formData.to,
      subject: formData.subject,
      body: formData.message,
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
    <div className="sendMail">
      <div className="sendMail-header">
        <h3>New Message</h3>
        <CloseIcon onClick={composeModal.toggle} className="sendMail-close" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="to"
          placeholder="To"
          type="email"
          {...register("to", { required: true })}
        />
        {errors.to && <p className="sendMail-error">To is Required!</p>}
        <input
          name="subject"
          placeholder="Subject"
          type="text"
          {...register("subject", { required: true })}
        />
        {errors.subject && (
          <p className="sendMail-error">Subject is Required!</p>
        )}
        <input
          name="message"
          placeholder="Message"
          type="text"
          className="sendMail-message"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <p className="sendMail-error">Message is Required!</p>
        )}
        <div className="sendMail-options">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="sendMail-send"
          >
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>
      {loading && <Loading />}
    </div>
  );
}

export default SendMail;
