import { useEffect } from "react";
import { useCallback, useState } from "react";
import removeCalendar from "../../services/removeCalendar";
import { toast } from "react-hot-toast";
import Loading from "./../Loading/Loading";
import CloseIcon from "@mui/icons-material/Close";

const EventModal = ({ data, setData, onClose, isOpened }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete ?");
    if (confirmDelete) {
      setLoading(true);
      removeCalendar(data._id)
        .then((res) => {
          setData((prev) => prev.filter((item) => item._id !== data._id));
          setLoading(false);
          toast.success("Calendar removed successfully");
          handleClose();
        })
        .catch((err) => {
          setLoading(false);
          toast.error("Calendar removal failed");
        });
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center h-screen   bg-neutral-300/70
        ${isOpened ? "flex" : "hidden"}
      `}
    >
      <div
        className={`
             translate duration-300  relative max-w-xl p-6 bg-white rounded-lg shadow-md w-96
              ${show ? "translate-y-0" : "translate-y-full"}
              ${show ? " opacity-100" : " opacity-0"}`}
      >
        <button
          className="absolute w-10 h-10 px-2 py-1 font-semibold text-gray-800 rounded-full bg-black-300 top-2 right-2 hover:bg-gray-200"
          onClick={handleClose}
        >
          <CloseIcon />
        </button>
        <h2 className="mb-2 text-2xl font-semibold">Meeting Details</h2>

        <div className="mb-2 border-b-[1px] pb-2">
          <p className="font-semibold text-gray-500">Organizer Email:</p>
          <p>{data.user}</p>
        </div>
        <div className="mb-2 border-b-[1px] pb-2">
          <p className="font-semibold text-gray-500">Attendee Email:</p>
          {data?.attendees?.map((attendee) => (
            <>
              <p key={attendee}>{attendee}</p>
            </>
          ))}
        </div>

        <div className="mb-2 border-b-[1px] pb-2">
          <p className="font-semibold text-gray-500">Title: </p>
          <p>{data.title}</p>
        </div>

        <div className="flex justify-between border-b-[1px] pb-2">
          <div className="mb-2">
            <p className="font-semibold text-gray-500">Start:</p>
            <p>{data.start}</p>
          </div>
          <div className="mb-2">
            <p className="font-semibold text-gray-500">End:</p>
            <p>{data.end}</p>
          </div>
        </div>

        <div className="mb-2 border-b-[1px] pb-2">
          <p className="font-semibold text-gray-500">Description:</p>
          <p>{data.description}</p>
        </div>
        <div className="mb-2">
          <p className="font-semibold text-gray-500">Location:</p>
          <p>{data.location}</p>
        </div>

        <button
          className="w-full p-4 px-4 py-2 my-4 mt-4 text-lg font-semibold text-white bg-red-500 rounded hover:bg-red-700"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default EventModal;
