// src/routes/AdminRoute.jsx
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/shared/LoadingSpinner"; 

const AdminRoute = ({ children }) => {
    const { user, loading, isAdmin } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner />; 
    }

    // Must be logged in AND have Admin role
    if (user && isAdmin) {
        return children;
    }

    // Redirect to home or 403 page
    return <Navigate to="/" state={{ from: location }} replace />; 
};

export default AdminRoute;

// NOTE: Create ModeratorRoute.jsx and StudentRoute.jsx similarly using isModerator and isStudent from AuthContext.