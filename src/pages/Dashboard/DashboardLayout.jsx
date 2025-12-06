import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function DashboardLayout() {
  const { user } = useAuth();

  return (
    <div className="flex gap-6">
      <aside className="w-64 bg-base-200 p-4 rounded">
        <div className="mb-4 font-bold">Dashboard</div>
        <nav className="flex flex-col gap-2">
          <NavLink to="/dashboard/profile" className={({isActive})=>isActive?'font-semibold':''}>My Profile</NavLink>
          {user?.role === 'admin' && (
            <>
              <NavLink to="/dashboard/add-scholarship">Add Scholarship</NavLink>
              <NavLink to="/dashboard/manage-scholarships">Manage Scholarships</NavLink>
              <NavLink to="/dashboard/manage-users">Manage Users</NavLink>
              <NavLink to="/dashboard/analytics">Analytics</NavLink>
            </>
          )}
          {user?.role === 'moderator' && (
            <>
              <NavLink to="/dashboard/applications">Manage Applications</NavLink>
              <NavLink to="/dashboard/reviews">All Reviews</NavLink>
            </>
          )}
          {user?.role === 'student' && (
            <>
              <NavLink to="/dashboard/my-applications">My Applications</NavLink>
              <NavLink to="/dashboard/my-reviews">My Reviews</NavLink>
            </>
          )}
        </nav>
      </aside>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
