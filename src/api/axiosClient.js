import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const axiosClient = axios.create({
  baseURL,
  withCredentials: true, // send httpOnly cookie for JWT
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: add response interceptor to catch 401 and redirect to login
axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      // optionally handle
    }
    return Promise.reject(err);
  }
);

export default axiosClient;
