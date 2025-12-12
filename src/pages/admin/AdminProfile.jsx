import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

export default function AdminProfile() {
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // Fetch profile dynamically
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get("/users/me");
        setProfile(res.data);
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
        });
      } catch (err) {
        console.error("Failed to fetch profile:", err.response?.data || err);
        Swal.fire("Error", "Failed to fetch profile info", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [axiosSecure]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await axiosSecure.patch("/users/me", formData);
      setProfile(res.data.user || res.data); // backend might return updated user
      setEditing(false);
      Swal.fire("Success", "Profile updated successfully", "success");
    } catch (err) {
      console.error("Failed to update profile:", err.response?.data || err);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to update profile",
        "error"
      );
    }
  };

  if (loading)
    return <p className="text-gray-900 dark:text-gray-100">Loading profile...</p>;
  if (!profile)
    return (
      <p className="text-gray-900 dark:text-gray-100">Profile data not available.</p>
    );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        My Profile
      </h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Welcome to your profile page. You can view or edit your personal information here.
      </p>
      <div className="bg-white dark:bg-gray-800 shadow rounded p-6 max-w-md">
        {/* Name */}
        <div className="mb-4">
          <label className="font-semibold text-gray-900 dark:text-gray-100">Name:</label>
          {editing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded w-full px-2 py-1 mt-1 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700"
            />
          ) : (
            <p className="text-gray-900 dark:text-gray-100">{profile.name || "N/A"}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="font-semibold text-gray-900 dark:text-gray-100">Email:</label>
          {editing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded w-full px-2 py-1 mt-1 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700"
            />
          ) : (
            <p className="text-gray-900 dark:text-gray-100">{profile.email || "N/A"}</p>
          )}
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="font-semibold text-gray-900 dark:text-gray-100">Role:</label>
          <p className="text-red-600 dark:text-red-400 font-semibold">{profile.role || "N/A"}</p>
        </div>

        {/* Joined Date */}
        {profile.createdAt && (
          <div className="mb-4">
            <label className="font-semibold text-gray-900 dark:text-gray-100">Joined:</label>
            <p className="text-gray-900 dark:text-gray-100">
              {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}

        {/* Buttons */}
        {editing ? (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setFormData({
                  name: profile.name || "",
                  email: profile.email || "",
                });
              }}
              className="bg-gray-400 text-white px-4 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
