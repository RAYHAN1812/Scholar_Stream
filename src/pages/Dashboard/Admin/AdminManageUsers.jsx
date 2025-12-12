import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function AdminManageUsers() {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState(""); // "" = all roles
  const [loading, setLoading] = useState(true);

  // Fetch users from backend
  const fetchUsers = async (role = "") => {
    setLoading(true);
    try {
      const query = role ? `?role=${role}` : "";
      const res = await axiosSecure.get(`/users${query}`);
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch users error:", err.response?.data || err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(filterRole);
  }, [filterRole]);

  // Delete user
  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Delete user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });
    if (!confirmed.isConfirmed) return;

    try {
      await axiosSecure.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((user) => user._id !== id));
      Swal.fire("Deleted!", "User removed.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete user", "error");
    }
  };

  // Change role (instant local update to prevent blinking)
  const handleChangeRole = async (id, newRole) => {
    try {
      await axiosSecure.patch(`/users/role/${id}`, { newRole });
      setUsers((prev) =>
        prev.map((user) => (user._id === id ? { ...user, role: newRole } : user))
      );
      Swal.fire("Updated!", "Role updated.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {/* Role Filter */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by Role:</label>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">All</option>
          <option value="Student">Student</option>
          <option value="Moderator">Moderator</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      {loading ? (
        <div>Loading users...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="border-b">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleChangeRole(user._id, e.target.value)
                        }
                        className="border rounded px-1 py-0.5"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Moderator">Moderator</option>
                        <option value="Student">Student</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
