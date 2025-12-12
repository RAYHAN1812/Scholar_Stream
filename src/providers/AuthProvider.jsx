// src/providers/AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axiosPublic from "../api/axiosClient";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // user info
  const [loading, setLoading] = useState(true); // loading state

  const axiosSecure = useAxiosSecure();

  // ===========================
  // LOGIN
  // ===========================
  const login = async (email, password) => {
    try {
      const res = await axiosPublic.post("/auth/login", { email, password });
      const { token, user } = res.data;

      if (token) localStorage.setItem("access-token", token);

      setUser(user);
      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw error; // caller should handle
    }
  };

  // ===========================
  // LOGOUT
  // ===========================
  const logout = () => {
    localStorage.removeItem("access-token");
    setUser(null);
  };

  // ===========================
  // FETCH PROFILE
  // ===========================
  const fetchProfile = async () => {
    const token = localStorage.getItem("access-token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await axiosSecure.get("/auth/profile");
      const profileUser = res.data.user || res.data;
      setUser(profileUser);
    } catch (error) {
      console.error("fetchProfile error:", error);
      logout(); // log out if token invalid or expired
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // ROLE HELPERS (derived from user)
  // ===========================
  const userRole = user?.role || "Student";
  const isAdmin = userRole === "Admin";
  const isModerator = userRole === "Moderator";
  const isStudent = userRole === "Student";

  // ===========================
  // INITIALIZE ON LOAD
  // ===========================
  useEffect(() => {
    fetchProfile();
  }, []);

  const value = {
    user,
    userRole,
    loading,
    isAdmin,
    isModerator,
    isStudent,
    login,
    logout,
    fetchProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
export const useAuth = () => useContext(AuthContext);
