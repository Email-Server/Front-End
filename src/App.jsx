import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header/Header";
import SendMail from "./components/SendMail/SendMail";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import useComposeModal from "./hooks/useComposeModa";
import useEmails from "./hooks/useEmails";

function App() {
  const { isOpen } = useComposeModal();
  const [emailsType, setEmailsType] = useState({});
  const [pageNum, setPageNum] = useState(1);
  const [emails, setEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const body = useMemo(() => {
    return {
      number: pageNum,
      ...emailsType,
    };
  }, [pageNum, emailsType]);

  const { data, loading, error } = useEmails(body);

  useEffect(() => {
    if (data?.receiver) {
      setEmails(data?.receiver);
    }
  }, [data]);

  const handleEmailSearch = (searchTerm) => {
    const filtered = emails.filter(
      (item) =>
        item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmails(filtered);
  };
  return (
    <div className="h-screen">
      <Header
        handleEmailSearch={handleEmailSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="flex h-screen">
        <Sidebar
          emails={emails}
          emailsType={emailsType}
          setEmailsType={(value) => setEmailsType(value)}
        />
        <div className="flex-1 ml-3 mr-5 p-6 mt-4  h-[90vh] bg-white rounded-lg shadow-md ">
          <Outlet
            context={[
              emails,
              filteredEmails,
              searchTerm,
              loading,
              error,
              setPageNum,
            ]}
          />
        </div>
      </div>
      {isOpen && <SendMail />}
    </div>
  );
}

export default App;
