import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <svg
            className="h-8 w-8 text-primary"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14.5v-9l6 4.5-6 4.5z" />
          </svg>
          <span className="text-xl font-bold text-slate-800 dark:text-slate-100 hidden sm:inline">
            ScholarStream
          </span>
        </Link>

        {/* Links */}
        <div className="hidden sm:flex items-center space-x-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link to="/" className="hover:text-primary">Home</Link>
          <Link to="/scholarships" className="hover:text-primary">All Scholarships</Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-2">
          {!user && (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg shadow-sm hover:opacity-90"
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <>
              <Link
                to="/dashboard"
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Dashboard
              </Link>

              <div className="relative group">
                <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark focus:ring-primary">
                  <img
                    src={
                      user.photoURL ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}`
                    }
                    alt="User profile"
                    className="w-full h-full object-cover"
                  />
                </button>
                <div className="hidden group-focus-within:block absolute right-0 mt-2 w-48 bg-background-light dark:bg-slate-800 rounded-md shadow-lg py-1 border border-slate-200 dark:border-slate-700">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
