import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import MyApplications from "./MyApplications";
import MyReviews from "./MyReviews";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("applications");

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["applications", "reviews"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded font-medium ${
              activeTab === tab ? "bg-indigo-600 text-white" : "bg-white border"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "applications" && <MyApplications />}
      {activeTab === "reviews" && <MyReviews />}
    </div>
  );
}
