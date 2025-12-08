// src/layouts/MainLayout.jsx - Enhanced with rich styling
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const MainLayout = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background-light to-slate-50 dark:from-background-dark dark:to-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      {!isDashboard && <Navbar />}

      <main className="flex-grow">
        {/* Outlet renders the current page content */}
        <Outlet />
      </main>

      {!isDashboard && <Footer />}
    </div>
  );
};

export default MainLayout;
