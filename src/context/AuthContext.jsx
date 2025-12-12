// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import axiosClient from "../api/axiosClient";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const axiosSecure = useAxiosSecure(); // ensures secure instance is initialized
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile if token exists
  const fetchProfile = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await axiosClient.get("/auth/profile"); // axiosClient already attaches token
      // Expect res.data.user from backend
      setUser(res.data.user || null);
    } catch (err) {
      console.error("fetchProfile error:", err);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Login: returns { success, message }
  const login = async ({ email, password }) => {
    try {
      const res = await axiosClient.post("/auth/login", { email, password });
      const token = res.data.token;
      const loggedUser = res.data.user;

      if (token) localStorage.setItem("token", token);
      setUser(loggedUser || null);

      return { success: true };
    } catch (err) {
      console.error("login error:", err);
      return { success: false, message: err.response?.data?.message || "Login failed" };
    }
  };

  // Register: returns { success, message }
  // photoURL optional (you upload to ImgBB on frontend and pass photoURL here)
  const register = async ({ name, email, password, role = "Student", photoURL = "" }) => {
    try {
      const res = await axiosClient.post("/auth/register", { name, email, password, role, photoURL });
      // Option A: auto login after register if backend returns token
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user || null);
        return { success: true };
      }
      // Option B: no token from backend -> you may call login() after register
      return { success: true, user: res.data.user || null };
    } catch (err) {
      console.error("register error:", err);
      return { success: false, message: err.response?.data?.message || "Registration failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    // optionally: window.location.href = "/login";
  };

  // role helpers for UI & route guards
  const role = user?.role || "Student";
  const isAdmin = role === "Admin";
  const isModerator = role === "Moderator";
  const isStudent = role === "Student";

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    fetchProfile,
    axiosSecure, // expose if needed
    role,
    isAdmin,
    isModerator,
    isStudent,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
