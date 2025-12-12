// AdminDashboard.jsx
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import ManageScholarships from "./ManageScholarships";
import AdminManageUsers from "./AdminManageUsers";
import Analytics from "./Analytics";
import AdminProfile from "../../admin/AdminProfile";
import { useAuth } from "../../../context/AuthContext";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (!loading && (!user || user.role?.toLowerCase() !== 'admin')) {
    return <Navigate to="/login" replace />;
  }

  const sidebarLinks = [
    { path: "profile", label: "Profile" },
    { path: "manage-scholarships", label: "Manage Scholarships" },
    { path: "manage-users", label: "Manage Users" },
    { path: "analytics", label: "Analytics" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
        <div className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100">{user?.name}</div>
        <nav className="flex flex-col space-y-2">
          {sidebarLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname.endsWith(link.path)
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Routes>
          <Route path="profile" element={<AdminProfile />} />
          <Route path="manage-scholarships" element={<ManageScholarships />} />
          <Route path="manage-users" element={<AdminManageUsers />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path ="*" element={<Navigate to="profile" replace />} />
        </Routes>
      </main>
    </div>
  );
}
