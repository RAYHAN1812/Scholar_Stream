// src/providers/AuthProvider.jsx
import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "./AuthContext";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  const axiosPublic = useAxiosPublic();   // No token required
  const axiosSecure = useAxiosSecure();   // Token-based axios

  // ===========================
  // 🔐 AUTH METHODS
  // ===========================
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("access-token");
    setUserRole(null);
    return signOut(auth);
  };

  const updateUserInfo = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // ===========================
  // 🔐 JWT + ROLE MANAGEMENT
  // ===========================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        localStorage.removeItem("access-token");
        setUserRole(null);
        setLoading(false);
        return;
      }

      try {
        const userInfo = { email: currentUser.email };

        // 1️⃣ Get JWT
        const tokenRes = await axiosPublic.post("/jwt", userInfo);

        const token = tokenRes.data.token;

        if (token) {
          localStorage.setItem("access-token", token);
        }

        // 2️⃣ Fetch Role using axiosSecure
        const roleRes = await axiosSecure.get(`/users/role/${currentUser.email}`);
        setUserRole(roleRes.data.role || "Student");

      } catch (error) {
        console.error("JWT/Role Fetch Error:", error);
        setUserRole("Student"); // fallback
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // ===========================
  // ROLE HELPERS
  // ===========================
  const isAdmin = userRole === "Admin";
  const isModerator = userRole === "Moderator";
  const isStudent = userRole === "Student";

  const authInfo = {
    user,
    loading,
    userRole,
    isAdmin,
    isModerator,
    isStudent,
    createUser,
    signIn,
    logOut,
    updateUserInfo,
    googleSignIn,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
