// src/pages/Dashboard/Moderator/Profile.jsx
import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Swal from "sweetalert2";

export default function Profile() {
  const { user, fetchProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
  });

  if (!user) return <div className="text-center py-8">Loading profile...</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/auth/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      Swal.fire("Success", "Profile updated successfully!", "success");
      setEditing(false);
      fetchProfile(); // refresh the user data dynamically
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message || "Profile update failed", "error");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">My Profile</h2>

      <div className="flex flex-col items-center space-y-4">
        {formData.photoURL && (
          <img
            src={formData.photoURL}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border border-gray-200"
          />
        )}

        <div className="w-full space-y-2">
          <div>
            <label className="block text-gray-700 font-medium">Name:</label>
            {editing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded"
              />
            ) : (
              <p className="text-gray-700">{user.name}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email:</label>
            {editing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded"
              />
            ) : (
              <p className="text-gray-700">{user.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Photo URL:</label>
            {editing ? (
              <input
                type="text"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded"
              />
            ) : (
              formData.photoURL && <p className="text-gray-700">{formData.photoURL}</p>
            )}
          </div>
        </div>

        <div className="flex space-x-2">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setFormData({
                    name: user.name,
                    email: user.email,
                    photoURL: user.photoURL,
                  });
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
