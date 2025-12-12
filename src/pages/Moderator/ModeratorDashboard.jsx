// src/pages/Dashboard/Moderator/ModeratorDashboard.jsx
import React, { useState, useEffect } from "react";
import ManageApplications from "./ManageApplications";
import AllReviews from "./AllReviews";
import { useAuth } from "../../../context/AuthContext";

export default function ModeratorDashboard() {
  const [activeTab, setActiveTab] = useState("applications");
  const { user } = useAuth(); // get logged-in moderator info

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Moderator Dashboard</h1>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("applications")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "applications"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Manage Applications
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "reviews"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            All Reviews
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "profile"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            My Profile
          </button>
        </nav>
      </div>

      {/* Tab content */}
      <div className="mt-4">
        {activeTab === "applications" && <ManageApplications />}
        {activeTab === "reviews" && <AllReviews />}
        {activeTab === "profile" && (
          <div className="p-4 bg-white rounded-xl shadow max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">Profile Information</h2>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
            {user?.photoURL && (
              <img src={user.photoURL} alt="Profile" className="mt-4 w-32 h-32 rounded-full object-cover" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
