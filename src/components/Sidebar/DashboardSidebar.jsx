import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function DashboardSidebar() {
  const { user } = useAuth();

  const links = [];

  // Admin links
  if (user?.role === "Admin") {
    links.push(
      { name: "Add Scholarship", path: "/dashboard/add-scholarship", icon: "add_circle" },
      { name: "Manage Scholarships", path: "/dashboard/manage-scholarships", icon: "library_books" },
      { name: "Manage Users", path: "/dashboard/manage-users", icon: "group" },
      { name: "Analytics", path: "/dashboard/analytics", icon: "analytics" },
      { name: "Admin Profile", path: "/dashboard/profile", icon: "admin_panel_settings" }
    );
  }

  // Moderator links
  if (user?.role === "Moderator") {
    links.push(
      { name: "Manage Applications", path: "/dashboard/manage-applications", icon: "assignment" },
      { name: "All Reviews", path: "/dashboard/all-reviews", icon: "reviews" }
    );
  }

  // Student links
  if (user?.role === "Student") {
    links.push(
      { name: "My Applications", path: "/dashboard/my-applications", icon: "task" },
      { name: "My Reviews", path: "/dashboard/my-reviews", icon: "rate_review" }
    );
  }

  // Shared link
  links.push({ name: "Profile", path: "/dashboard/profile", icon: "person" });

  return (
    <aside className="w-64 h-screen bg-card border-r border-borderColor p-5 flex flex-col shadow-sm">

      {/* 🔙 Back Button */}
      <Link
        to="/"
        className="flex items-center gap-2 mb-6 text-textMuted hover:text-primary transition"
      >
        <span className="material-icons-outlined text-xl">arrow_back</span>
        <span className="font-medium">Back to Home</span>
      </Link>

      <h2 className="text-xl font-bold text-textPrimary mb-6">Dashboard</h2>

      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-primary/20 text-primary font-semibold"
                  : "text-textMuted hover:bg-background"
              }`
            }
          >
            <span className="material-icons-outlined text-lg">{link.icon}</span>
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
