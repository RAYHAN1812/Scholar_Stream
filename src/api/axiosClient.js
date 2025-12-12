// src/api/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api", // backend base -> /api + relative paths
  // withCredentials: true, // enable if you use cookies
});

// Attach token automatically for normal public calls too
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` };
  return config;
}, (err) => Promise.reject(err));

export default axiosClient;
