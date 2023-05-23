import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import AddContactModal from "../AddContactModal/AddContactModal";
import ContactCard from "../ContactCard/ContactCard";
import useContacts from "./../../hooks/useContacts";
import LoadingDots from "../LoadingDots/LoadingDots";
const Contacts = () => {
  const { data, loading } = useContacts();
  const [filter, setFilter] = useState([]);
  const [AddContactModalOpen, setAddContactModalOpen] = useState(false);
  const [updateContact, setUpdateContact] = useState({});

  useEffect(() => {
    setFilter(data);
  }, [data]);

  const searchHandler = (e) => {
    if (e.target.value == "") {
      setFilter(data);
    } else {
      const newFilter = data.filter((value) => {
        return value.name.toLowerCase().includes(e.target.value.toLowerCase());
      });
      setFilter(newFilter);
    }
  };

  return (
    <div className=" flex-[1]">
      <div className="mb-4 text-lg font-bold ">
        {loading ? null : (
          <h2 className="flex items-center ">{filter.length} Contacts</h2>
        )}
      </div>
      <div className="flex items-center gap-3 p-4  pb-7  border-b-[1px] rounded-md">
        <div className="relative flex-1 ">
          <div className="absolute cursor-pointer left-2 top-3 text-neutral-400 ">
            <SearchIcon />
          </div>
          <input
            type="text"
            className="w-full px-9 py-3 rounded-md border-[1px] focus:outline-neutral-300 "
            placeholder="Search"
            onChange={searchHandler}
          />
        </div>
        <div className=" w-fit">
          <button
            className="p-3 text-white bg-[#1999fc] rounded-md hover:bg-[#1990fc]"
            onClick={() => setAddContactModalOpen(true)}
          >
            Add Contact
          </button>
        </div>
      </div>

      <div className="flex flex-col w-full gap-3 ">
        {loading && (
          <div className="mx-auto mt-20 w-fit">
            <LoadingDots />
          </div>
        )}
        {filter.length == 0 && !loading && (
          <div className="flex items-center justify-center w-full h-full mt-6 text-2xl font-bold text-neutral-400">
            No Contacts
          </div>
        )}
        {filter.map((value, key) => {
          return (
            <ContactCard
              key={key}
              name={value.name}
              email={value.email}
              setUpdateContact={setUpdateContact}
              setAddContactModalOpen={setAddContactModalOpen}
              data={data}
              setFilter={setFilter}
            />
          );
        })}
      </div>
      <AddContactModal
        isOpened={AddContactModalOpen}
        onClose={() => setAddContactModalOpen(false)}
        updateContact={updateContact}
        setUpdateContact={setUpdateContact}
        setFilter={setFilter}
      />
    </div>
  );
};

export default Contacts;
