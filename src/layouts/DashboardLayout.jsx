// src/layouts/DashboardLayout.jsx
import { useContext } from "react";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const DashboardLayout = () => {
  const { user, loading, userRole, isAdmin, isModerator, isStudent } =
    useContext(AuthContext);

  if (loading)
    return (
      <span className="loading loading-spinner loading-lg block mx-auto mt-20"></span>
    );
  if (!user) return <Navigate to="/login" />;

  // --- Sidebar Links based on Role ---
  const studentLinks = (
    <>
      <NavLink to="my-applications">My Applications</NavLink>
      <NavLink to="my-reviews">My Reviews</NavLink>
      <NavLink to="profile">My Profile</NavLink>
    </>
  );

  const moderatorLinks = (
    <>
      <NavLink to="manage-applications">Manage Applied Applications</NavLink>
      <NavLink to="all-reviews">All Reviews</NavLink>
      <NavLink to="profile">My Profile</NavLink>
    </>
  );

  const adminLinks = (
    <>
      <NavLink to="add-scholarship">Add Scholarship</NavLink>
      <NavLink to="manage-scholarships">Manage Scholarships</NavLink>
      <NavLink to="manage-users">Manage Users</NavLink>
      <NavLink to="analytics">Analytics</NavLink>
      <NavLink to="profile">My Profile</NavLink>
    </>
  );

  const getDashboardLinks = () => {
    if (isAdmin) return adminLinks;
    if (isModerator) return moderatorLinks;
    if (isStudent) return studentLinks;
    return null;
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar (Full Width for mobile, 1/4 or custom width for desktop) */}
      <div className="w-full lg:w-64 bg-base-200 shadow-xl p-4">
        <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-2">
          {userRole} Dashboard
        </h2>
        <ul className="menu space-y-2">
          {getDashboardLinks()}
          <div className="divider my-4"></div>
          <NavLink to="/">🏠 Home</NavLink>
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
