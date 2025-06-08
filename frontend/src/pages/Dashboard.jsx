import React from "react";
import { Outlet } from "react-router-dom";
import SidebarLeft from "../components/SidebarLeft";

const Dashboard = () => {
  return (
    <>
      <div className="container">
        <div className="sidebarLeft">
          <SidebarLeft />
        </div>

        {/* Main Content Area */}
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
