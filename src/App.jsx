import { useState } from "react";

import Header from "./components/Header/Header";
import SendMail from "./components/SendMail/SendMail";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import useComposeModal from "./hooks/useComposeModa";
import useEmails from "./hooks/useEmails";

function App() {
  const [emailsType, setEmailsType] = useState("all");
  const [pageNum, setPageNum] = useState(1);
  const { data, loading, error } = useEmails({ pageNum, emailsType });

  const { isOpen } = useComposeModal();
  return (
    <div className="h-screen">
      <Header />
      <div className="flex h-screen">
        <Sidebar
          emails={data}
          emailsType={emailsType}
          setEmailsType={(value) => setEmailsType(value)}
        />
        <Outlet context={[data, loading, setPageNum]} />
      </div>
      {isOpen && <SendMail />}
    </div>
  );
}

export default App;
