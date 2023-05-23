import React, { useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import { toast } from "react-hot-toast";
import Modal from "@mui/material/Modal";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import DoneIcon from "@mui/icons-material/Done";
import UnpublishedIcon from "@mui/icons-material/Unpublished";

import schedulerRequest from "../../services/schedulerRequest";
import useReceiveScheduler from "../../hooks/useScheduler";
import useStore from "./../../hooks/useStore";
import "../EmailRow/EmailRow.css";
import seenIcon from "../../assets/seen.png";
import scheduleRemove from "../../services/scheduleRemove";
import scheduleEdit from "../../services/scheduleEdit";
import scheduleApprove from "../../services/scheduleApprove";
import scheduleIgnore from "../../services/scheduleIgnore";

const Scheduler = () => {
  const {
    userInfo: { email },
  } = useStore();

  // fetch current Scheduler data
  const { data, loading, error } = useReceiveScheduler(email);
  console.log(data);

  const [rerender, setRerender] = useState(false);

  const [showSent, setShowSent] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [attendee, setAttendee] = useState();
  const [organizer, setOrganizer] = useState();
  const [schedulerId, setScheduleId] = useState("");
  const [sDate, setSDate] = useState();
  const [sTime, setSTime] = useState();
  const [eDate, setEDate] = useState();
  const [eTime, setETime] = useState();

  const SetView = (data) => {
    let row = [];
    data?.map((schedule) => {
      row.push(
        <div
          key={schedule._id}
          style={styles.scheduleContainer}
          className="shadow-xl hover:cursor-pointer hover:bg-slate-100"
          onClick={() => {
            setTitle(schedule.title);
            setDescription(schedule.description);
            setStart(moment(schedule.start).format("YYYY-MM-DD __ HH:mm:ss"));
            setEnd(moment(schedule.end).format("YYYY-MM-DD __ HH:mm:ss"));
            setAttendee(schedule.attendeeEmail);
            setScheduleId(schedule._id);
            setOrganizer(schedule.organizerEmail);
            setOpenModal(true);
          }}
        >
          <label style={styles.title}>{schedule.title}</label>
          <label className="truncate text-lg ml-40">
            {schedule.description}
          </label>
          {schedule.received === true && (
            <img src={seenIcon} style={styles.seen} />
          )}
          {schedule.approved === "no" && (
            <UnpublishedIcon
              size="large"
              color="error"
              style={{ position: "absolute", right: 36 }}
            />
          )}
        </div>
      );
    });
    return row;
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center flex-[0.7] h-full">
          loading
        </div>
      ) : (
        <div style={styles.container}>
          <div style={styles.btnsContainer}>
            <input
              type="button"
              value={"Sent"}
              style={styles.btn}
              className={`hover:cursor-pointer ${
                showSent && "bg-slate-300"
              } bg-slate-100 hover:bg-slate-300`}
              onClick={() => {
                setShowSent(true);
              }}
            />
            <input
              type="button"
              value={"Received"}
              style={styles.btn}
              className={`hover:cursor-pointer ${
                !showSent && "bg-slate-300"
              } bg-slate-100 hover:bg-slate-300`}
              onClick={() => {
                setShowSent(false);
              }}
            />
          </div>
          {data.sent?.length === 0 && showSent ? (
            <div className="flex items-center justify-center flex-[0.7] h-full">
              no sent Schedules
            </div>
          ) : data.received?.length === 0 && !showSent ? (
            <div className="flex items-center justify-center flex-[0.7] h-full">
              no received Schedules
            </div>
          ) : (
            <div style={styles.viewContainer}>
              {SetView(showSent ? data.sent : data.received)}
            </div>
          )}

          <Modal
            open={openModal}
            onClose={() => {
              setOpenModal(false);
            }}
            sx={{ position: "absolute", top: "50%", left: "50%" }}
          >
            <div style={styles.modal}>
              {showSent ? (
                <input
                  type="text"
                  placeholder={title}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-2xl font-bold mb-10 text-center border-2 border-slate-700"
                />
              ) : (
                <p className="text-4xl font-semibold mb-5 text-slate-800">
                  {title}
                </p>
              )}
              {showSent ? (
                <input
                  type="text"
                  placeholder={description}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="text-xl font-semibold mb-5 text-slate-800 text-center border-2 border-slate-700"
                />
              ) : (
                <p className="text-xl font-semibold mb-5 text-slate-800">
                  {description}
                </p>
              )}

              {showSent ? (
                <p className="text-lg mb-5">Attendee: {attendee}</p>
              ) : (
                <p className="text-lg mb-5">organizer: {organizer}</p>
              )}

              {showSent ? (
                <>
                  <label>start at: {start}</label>
                  <input
                    type="date"
                    value={sDate}
                    onChange={(e) => setSDate(e.target.value)}
                    style={{
                      borderWidth: 2,
                      width: 200,
                      height: 80,
                      borderColor: "#555",
                    }}
                  />
                  <input
                    type="time"
                    value={sTime}
                    onChange={(e) => setSTime(e.target.value)}
                    style={{
                      borderWidth: 2,
                      width: 200,
                      height: 80,
                      borderColor: "#555",
                      margin: 2,
                      marginBottom: 15,
                    }}
                  />
                </>
              ) : (
                <p className="text-lg mb-3">Start at: {start}</p>
              )}

              {showSent ? (
                <>
                  <label>end at: {end}</label>
                  <input
                    type="date"
                    value={eDate}
                    onChange={(e) => setEDate(e.target.value)}
                    style={{
                      borderWidth: 2,
                      width: 200,
                      height: 80,
                      borderColor: "#555",
                    }}
                  />
                  <input
                    type="time"
                    value={eTime}
                    onChange={(e) => setETime(e.target.value)}
                    style={{
                      borderWidth: 2,
                      width: 200,
                      height: 80,
                      borderColor: "#555",
                      margin: 2,
                    }}
                  />
                </>
              ) : (
                <p className="text-lg mb-3">Start at: {end}</p>
              )}

              {showSent ? (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div
                    style={styles.iconContainer}
                    className="bg-slate-200 flex rounded-lg hover:cursor-pointer hover:bg-slate-300"
                    onClick={() => {
                      scheduleRemove({ schedulerId })
                        .then((res) => {
                          toast.success("Schedule deleted Successfully");
                          setOpenModal(false);
                        })
                        .catch((err) => {
                          toast.error("Error Schedule Not deleted");
                        });
                    }}
                  >
                    <DeleteIcon size="large" color="error" />
                  </div>
                  <div
                    style={styles.iconContainer}
                    className="bg-slate-200 flex rounded-lg hover:cursor-pointer hover:bg-slate-300"
                    onClick={() => {
                      scheduleEdit({
                        id: schedulerId,
                        attendeeEmail: attendee,
                        title,
                        start:
                          moment(sDate).format("YYYY-MM-DD") +
                          " " +
                          moment(sTime, "HH:mm:ss").format("HH:mm:ss"),
                        end:
                          moment(eDate).format("YYYY-MM-DD") +
                          " " +
                          moment(eTime, "HH:mm:ss").format("HH:mm:ss"),
                        description,
                      })
                        .then((res) => {
                          toast.success("Schedule updated Successfully");
                          setOpenModal(false);
                        })
                        .catch((err) => {
                          toast.error("Error Schedule Not updated");
                        });
                    }}
                  >
                    <CreateIcon size="large" color="primary" />
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div
                    style={styles.iconContainer}
                    className="bg-slate-200 flex rounded-lg hover:cursor-pointer hover:bg-slate-300 "
                    onClick={() => {
                      scheduleApprove({ schedulerId })
                        .then((res) => {
                          toast.success("Schedule approved Successfully");
                          setOpenModal(false);
                        })
                        .catch((err) => {
                          toast.error("Error Schedule Not approved");
                        });
                    }}
                  >
                    <DoneIcon size="large" color="success" />
                  </div>

                  <div
                    style={styles.iconContainer}
                    className="bg-slate-200 flex rounded-lg hover:cursor-pointer hover:bg-slate-300 "
                    onClick={() => {
                      scheduleIgnore({ schedulerId })
                        .then((res) => {
                          toast.success("Schedule ignored Successfully");
                          setOpenModal(false);
                        })
                        .catch((err) => {
                          toast.error("Error Schedule Not ignored");
                        });
                    }}
                  >
                    <UnpublishedIcon size="large" color="error" />
                  </div>
                </div>
              )}
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

const styles = {
  container: {
    padding: 20,
    width: "100%",
  },
  btn: {
    height: 40,
    width: "30%",
    borderWidth: 2,
    borderColor: "#999",
    borderRadius: 5,
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "700",
  },
  btnsContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: 10,
  },
  viewContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  scheduleContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    width: "90%",
    height: 50,
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
    marginLeft: 20,
  },
  seen: {
    position: "absolute",
    right: 5,
    width: 30,
  },
  modal: {
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 500,
    backgroundColor: "#fff",
    boxShadow: 24,
    padding: 15,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 5,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
};

export default Scheduler;
