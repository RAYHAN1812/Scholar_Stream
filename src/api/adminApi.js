// src/api/adminApi.js
import useAxiosSecure from "../hooks/useAxiosSecure";

// Example functions — call them inside components (hooks) to use axiosSecure
export const adminApi = () => {
  const axiosSecure = useAxiosSecure();

  return {
    fetchUsers: async () => {
      const res = await axiosSecure.get("/admin/users");
      return res.data;
    },
    changeUserRole: async (email, newRole) => {
      const res = await axiosSecure.patch(`/admin/users/role`, { email, role: newRole });
      return res.data;
    },
    deleteUser: async (userId) => {
      const res = await axiosSecure.delete(`/admin/users/${userId}`);
      return res.data;
    },
    fetchScholarships: async () => {
      const res = await axiosSecure.get("/admin/scholarships");
      return res.data;
    },
    createScholarship: async (payload) => {
      const res = await axiosSecure.post("/admin/scholarships", payload);
      return res.data;
    },
    updateScholarship: async (id, payload) => {
      const res = await axiosSecure.patch(`/admin/scholarships/${id}`, payload);
      return res.data;
    },
    deleteScholarship: async (id) => {
      const res = await axiosSecure.delete(`/admin/scholarships/${id}`);
      return res.data;
    },
    fetchAnalytics: async () => {
      const res = await axiosSecure.get("/admin/analytics");
      return res.data;
    },
  };
};
