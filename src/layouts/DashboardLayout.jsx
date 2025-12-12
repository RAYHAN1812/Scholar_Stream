import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/Sidebar/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-grow p-6 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
