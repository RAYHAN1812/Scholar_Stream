import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

export default function MyApplications() {
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch applications
  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/student/applications");
      setApplications(res.data || []);
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

  if (loading)
    return <div className="text-center py-8">Loading applications...</div>;

  if (applications.length === 0)
    return (
      <div className="text-center py-8 text-gray-500">
        No paid applications found.
      </div>
    );

  const handleViewDetails = (app) => {
    Swal.fire({
      title: "Application Details",
      html: `
        <strong>University:</strong> ${app.universityName} <br/>
        <strong>Scholarship:</strong> ${app.scholarshipName} <br/>
        <strong>Amount:</strong> $${app.amount / 100} <br/>
        <strong>Payment Status:</strong> ${app.paymentStatus} <br/>
        <strong>Application Status:</strong> ${app.status} <br/>
        <strong>Submitted At:</strong> ${new Date(app.submittedAt).toLocaleString()} <br/>
        <strong>Transaction ID:</strong> ${app.transactionId || "N/A"}
      `,
      icon: "info",
    });
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                University
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Scholarship
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fees
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {applications.map((app) => (
              <tr key={app._id}>
                <td className="px-6 py-4">{app.universityName}</td>
                <td className="px-6 py-4">{app.scholarshipName}</td>
                <td className="px-6 py-4">${app.amount / 100}</td>
                <td className="px-6 py-4">{app.paymentStatus}</td>
                <td className="px-6 py-4">{app.status}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleViewDetails(app)}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
