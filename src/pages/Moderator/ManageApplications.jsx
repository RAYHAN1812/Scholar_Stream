// src/pages/Moderator/ManageApplications.jsx
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../context/AuthContext";

export default function ManageApplications() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // ✅ logged-in user
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch all applications
  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/applications/moderator/applications");
      setApplications(res.data || []);
      setFilteredApps(res.data || []);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch applications", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Filter applications based on search and status
  useEffect(() => {
    let filtered = [...applications];
    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.studentEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.universityName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter) {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }
    setFilteredApps(filtered);
  }, [searchTerm, statusFilter, applications]);

  // Update status / feedback
  const handleUpdate = async (id, status, feedback) => {
    try {
      await axiosSecure.patch(`/applications/moderator/applications/${id}/status`, { status, feedback });
      Swal.fire("Success", "Application updated", "success");
      fetchApplications();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update application", "error");
    }
  };

  // Reject application
  const handleReject = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will reject the application.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.patch(`/applications/moderator/applications/${id}/reject`);
        Swal.fire("Rejected!", "Application has been rejected.", "success");
        fetchApplications();
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to reject application", "error");
      }
    }
  };

  // Open details modal
  const openDetails = async (id) => {
    try {
      const res = await axiosSecure.get(`/applications/moderator/applications/${id}`);
      setSelectedApp(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch application details", "error");
    }
  };
  const closeDetails = () => setSelectedApp(null);

  if (loading) return <div className="text-center py-8">Loading applications...</div>;

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-2 text-indigo-700">Manage Applications</h1>
      {user && (
        <p className="mb-4 text-black font-medium">
          Logged in as: <span className="font-bold">{user.name}</span>
        </p>
      )}

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by student, email, or university"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg flex-1 min-w-[200px] text-black"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg text-black"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button
          onClick={() => { setSearchTerm(""); setStatusFilter(""); }}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black"
        >
          Reset
        </button>
      </div>

      {filteredApps.length === 0 ? (
        <div className="text-center text-gray-500">No applications found.</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full divide-y divide-gray-200 text-black">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">University</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Feedback</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApps.map((app) => (
                <tr key={app._id}>
                  <td className="px-6 py-4 text-black">{app.studentName}</td>
                  <td className="px-6 py-4 text-black">{app.studentEmail}</td>
                  <td className="px-6 py-4 text-black">{app.universityName || "-"}</td>
                  <td className="px-6 py-4 text-black">{app.feedback || "-"}</td>
                  <td className="px-6 py-4 text-black">{app.status}</td>
                  <td className="px-6 py-4 text-black">{app.paymentStatus || "Pending"}</td>
                  <td className="px-6 py-4 flex flex-wrap gap-1">
                    <button
                      onClick={() => openDetails(app._id)}
                      className="px-2 py-1 text-blue-600 border border-blue-200 rounded hover:bg-blue-50"
                    >
                      Details
                    </button>

                    {app.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleUpdate(app._id, "Processing", app.feedback)}
                          className="px-2 py-1 text-green-600 border border-green-200 rounded hover:bg-green-50"
                        >
                          Processing
                        </button>
                        <button
                          onClick={() => handleReject(app._id)}
                          className="px-2 py-1 text-red-600 border border-red-200 rounded hover:bg-red-50"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {app.status === "Processing" && (
                      <button
                        onClick={() => handleUpdate(app._id, "Completed", app.feedback)}
                        className="px-2 py-1 text-indigo-600 border border-indigo-200 rounded hover:bg-indigo-50"
                      >
                        Completed
                      </button>
                    )}

                    {app.status === "Completed" && (
                      <button
                        onClick={() => {
                          Swal.fire({
                            title: "Add Feedback",
                            input: "textarea",
                            inputValue: app.feedback || "",
                            showCancelButton: true,
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleUpdate(app._id, app.status, result.value);
                            }
                          });
                        }}
                        className="px-2 py-1 text-yellow-600 border border-yellow-200 rounded hover:bg-yellow-50"
                      >
                        Feedback
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-lg w-full text-black">
            <h2 className="text-xl font-bold mb-4">Application Details</h2>
            <p><strong>Name:</strong> {selectedApp.studentName}</p>
            <p><strong>Email:</strong> {selectedApp.studentEmail}</p>
            <p><strong>University:</strong> {selectedApp.universityName || "-"}</p>
            <p><strong>Status:</strong> {selectedApp.status}</p>
            <p><strong>Payment:</strong> {selectedApp.paymentStatus || "Pending"}</p>
            <p><strong>Feedback:</strong> {selectedApp.feedback || "-"}</p>
            <div className="mt-4 text-right">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
