// src/context/AuthContext.jsx - CORRECTED
import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const fetchProfile = async () => {
    try {
      const { data } = await axiosClient.get('/auth/profile');
      setUser(data);
    } catch (err) {
      // FIX: Only log the error, but this is the expected path if no user is logged in.
      // The state is already null, so we just stop loading.
      setUser(null); 
    } finally {
      setLoadingAuth(false);
    }
  };

  // FIX: This is the correct place to run the check
  useEffect(() => {
    // Check profile on initial load to maintain session from cookie
    fetchProfile(); 
  }, []);

  const login = async (email, password) => {
    const { data } = await axiosClient.post('/auth/login', { email, password });
    // The backend sets the cookie here.
    // FIX: Re-fetch the profile immediately after a successful login to confirm the cookie is working
    await fetchProfile(); 
    
    return data;
  };

  const register = async (payload) => {
    const { data } = await axiosClient.post('/auth/register', payload);
    // FIX: Assuming register also initiates a session/sets a cookie
    await fetchProfile(); 

    return data;
  };

  const logout = async () => {
    try {
      await axiosClient.post('/auth/logout');
    } catch (err) {
      // ignore
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loadingAuth, login, register, logout, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}