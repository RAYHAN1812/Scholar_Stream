import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function ManageScholarships() {
  const axiosSecure = useAxiosSecure();
  const [scholarships, setScholarships] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch all scholarships
  const fetchScholarships = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/scholarships");

      // Ensure scholarships is always an array
      const data = Array.isArray(res.data) ? res.data : res.data?.scholarships || [];
      setScholarships(data);
    } catch (err) {
      console.error("Fetch scholarships error:", err.response?.data || err);
      setScholarships([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  // Start editing a scholarship
  const handleEdit = (sch) => {
    setEditingId(sch._id);
    setEditingData({
      scholarshipName: sch.scholarshipName || "",
      universityName: sch.universityName || "",
      universityWorldRank: sch.universityWorldRank || 0,
      tuitionFees: sch.tuitionFees || 0,
      applicationFees: sch.applicationFees || 0,
      serviceCharge: sch.serviceCharge || 0,
      applicationDeadline: sch.applicationDeadline
        ? new Date(sch.applicationDeadline).toISOString().split("T")[0]
        : "",
    });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setEditingData({});
  };

  // Save edited scholarship
  const handleSave = async (id) => {
    if (!id) {
      Swal.fire("Error", "Invalid scholarship ID", "error");
      return;
    }

    const payload = {
      scholarshipName: editingData.scholarshipName?.trim() || "",
      universityName: editingData.universityName?.trim() || "",
      universityWorldRank: Number(editingData.universityWorldRank) || 0,
      tuitionFees: Number(editingData.tuitionFees) || 0,
      applicationFees: Number(editingData.applicationFees) || 0,
      serviceCharge: Number(editingData.serviceCharge) || 0,
      applicationDeadline: editingData.applicationDeadline
        ? new Date(editingData.applicationDeadline)
        : null,
    };

    try {
      console.log("PATCH payload:", payload, "ID:", id);
      await axiosSecure.patch(`/scholarships/${id}`, payload);

      setScholarships((prev) =>
        prev.map((sch) => (sch._id === id ? { ...sch, ...payload } : sch))
      );

      setEditingId(null);
      setEditingData({});
      Swal.fire("Success", "Scholarship updated!", "success");
    } catch (err) {
      console.error("Edit scholarship error:", err.response?.data || err);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to save scholarship",
        "error"
      );
    }
  };

  // Delete a scholarship
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this scholarship?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });
    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/scholarships/${id}`);
      setScholarships((prev) => prev.filter((sch) => sch._id !== id));
      Swal.fire("Deleted!", "Scholarship removed.", "success");
    } catch (err) {
      console.error("Delete scholarship error:", err.response?.data || err);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to delete scholarship",
        "error"
      );
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">
        Manage Scholarships
      </h2>

      {loading ? (
        <div>Loading scholarships...</div>
      ) : (
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-gray-700">University</th>
              <th className="px-4 py-2 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {(scholarships.length === 0 ? [] : scholarships).map((sch) => (
              <tr key={sch._id} className="text-gray-800">
                <td className="px-4 py-2">
                  {editingId === sch._id ? (
                    <input
                      className="border rounded px-2 py-1 w-full"
                      value={editingData.scholarshipName}
                      onChange={(e) =>
                        setEditingData({
                          ...editingData,
                          scholarshipName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    sch.scholarshipName
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingId === sch._id ? (
                    <input
                      className="border rounded px-2 py-1 w-full"
                      value={editingData.universityName}
                      onChange={(e) =>
                        setEditingData({
                          ...editingData,
                          universityName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    sch.universityName
                  )}
                </td>
                <td className="px-4 py-2 space-x-2">
                  {editingId === sch._id ? (
                    <>
                      <button
                        onClick={() => handleSave(sch._id)}
                        className="px-3 py-1 bg-green-600 text-white rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-3 py-1 bg-gray-400 text-white rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(sch)}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(sch._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {scholarships.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-2 text-center text-gray-500">
                  No scholarships found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
