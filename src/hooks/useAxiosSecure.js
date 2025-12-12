// src/hooks/useAxiosSecure.js
import axios from "axios";
import { useEffect } from "react";

/**
 * A small hook that returns an axios instance which:
 *  - attaches Authorization header from localStorage 'token'
 *  - handles 401/403 by removing token (auto-logout) to keep client state consistent
 *
 * Use this in pages/components that call protected endpoints.
 */
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000/api",
});

const useAxiosSecure = () => {
  useEffect(() => {
    const req = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` };
        return config;
      },
      (error) => Promise.reject(error)
    );

    const res = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          // Token invalid/expired -> clear and reload (or UI should handle redirect)
          localStorage.removeItem("token");
          // Optionally: window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(req);
      axiosSecure.interceptors.response.eject(res);
    };
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
