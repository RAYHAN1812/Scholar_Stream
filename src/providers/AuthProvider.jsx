// src/providers/AuthProvider.jsx
import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic'; // Assume this hook creates an axios instance without the token

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null); 
    const axiosPublic = useAxiosPublic();
    
    // Auth Methods
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
        return signOut(auth);
    };
    
    const updateUserInfo = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    };
    
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // --- JWT and Role Management ---
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);

            if (currentUser) {
                const userInfo = { email: currentUser.email };
                
                // 1. Get JWT Token from the server
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            
                            // 2. Fetch User Role using the new token
                            // We use a general axios instance for role check as it needs the token
                            axiosPublic.get(`/users/role/${currentUser.email}`, {
                                headers: {
                                    Authorization: `Bearer ${res.data.token}`
                                }
                            })
                            .then(roleRes => {
                                setUserRole(roleRes.data.role);
                                setLoading(false);
                            })
                            .catch((err) => {
                                console.error("Error fetching role:", err);
                                setUserRole('Student'); // Default to student if API fails
                                setLoading(false);
                            });
                        }
                    })
                    .catch((err) => {
                        console.error("Error getting JWT:", err);
                        setLoading(false);
                    });

            } else {
                // Remove token and role on logout
                localStorage.removeItem('access-token');
                setUserRole(null);
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, [axiosPublic]);
    
    // Role Check Helpers
    const isAdmin = userRole === 'Admin';
    const isModerator = userRole === 'Moderator';
    const isStudent = userRole === 'Student'; // Default for non-admin/non-moderator

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserInfo,
        googleSignIn,
        userRole,
        isAdmin,
        isModerator,
        isStudent
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;