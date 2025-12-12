// src/routes/ModeratorRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ModeratorRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // show spinner or loader if needed
  if (!user || user.role !== "Moderator") return <Navigate to="/login" replace />;

  return children;
}
