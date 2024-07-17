import React from "react";
import Sidebar from "../../components/sidebar";
import ChatUI from "../../components/chatUi";
import { GoSidebarExpand } from "react-icons/go";
import { useState } from "react";
const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  console.log(isSidebarOpen)

  return (
    <div className="flex h-screen">
      {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
      <div className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'ml-64' : ''}`}>
        <ChatUI />
        {!isSidebarOpen && (
          <button
            className="btn btn-primary m-4"
            onClick={() => setIsSidebarOpen(true)}
          >

            Open Sidebar
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
