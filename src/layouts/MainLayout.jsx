// src/layouts/MainLayout.jsx - CORRECTED
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

const MainLayout = () => {
    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/dashboard');

    return (
        // Add a global wrapper div with base styling
        // 'font-sans' sets a default font.
        // 'bg-white dark:bg-slate-900' sets the background for light/dark mode.
        // 'text-slate-800 dark:text-slate-200' sets the default text color.
        <div className="font-sans bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 min-h-screen flex flex-col">
            
            {!isDashboard && <Navbar />} 
            
            <main className="flex-grow">
                {/* Outlet renders the current page content (Home.jsx) */}
                <Outlet />
            </main>
            
            {!isDashboard && <Footer />}
        </div>
    );
};

export default MainLayout;