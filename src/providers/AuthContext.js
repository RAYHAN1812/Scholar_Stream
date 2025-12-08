import { createContext, useContext, useState, useEffect } from "react";
// ⭐ CRITICAL: Ensure this imports the configured client with withCredentials: true
import axiosClient from "../api/axiosClient";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // 1. STATE DEFINITIONS
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Default to true while checking session

  // 2. FETCH PROFILE FUNCTION (Handles initial session check)
  // This is the function on line 13 that was failing with 401
  const fetchProfile = async () => {
    setLoading(true);

    try {
      // This attempts to use the JWT cookie sent by axiosClient
      const res = await axiosClient.get("/auth/profile");

      // If successful (200 OK), set the user
      setUser(res.data.user);
    } catch (error) {
      // ⭐ THE FIX: Check for the expected 401 Unauthorized status
      if (error.response && error.response.status === 401) {
        // If 401, the user is unauthenticated or the session expired.
        // We set user to null and DO NOT throw the error.
        setUser(null);
      } else {
        // Handle true, unexpected server errors (500, network, etc.)
        console.error("Unexpected Profile fetch error:", error);
      }
    } finally {
      setLoading(false); // Stop loading once the check is complete
    }
  };

  // 3. INITIAL SESSION CHECK
  // This runs once when the component mounts (The block around line 27)
  useEffect(() => {
    fetchProfile();
  }, []);

  // 4. AUTH FUNCTIONS

  const register = async (payload) => {
    try {
      const res = await axiosClient.post("/auth/register", payload);
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const login = async (payload) => {
    try {
      // 1. Post credentials to get cookie
      const res = await axiosClient.post("/auth/login", payload);
      // 2. Immediately fetch profile to update context state
      await fetchProfile();
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      // You need a backend route to clear the httpOnly cookie!
      // await axiosClient.post('/auth/logout');
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // 5. AUTH CONTEXT VALUE
  const authInfo = {
    user,
    loading,
    register,
    login,
    logout,
    // ... include any other context data/functions here
  };

  // 6. RENDER PROVIDER
  return (
    <AuthContext.Provider value={authInfo}>
      {/* Prevent rendering content until the session check is complete */}
      {loading ? <div>Loading Authentication...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
