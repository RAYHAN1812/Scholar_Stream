// src/pages/Dashboard/Moderator/AllReviews.jsx
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

export default function AllReviews() {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/applications/moderator/reviews");
      setReviews(res.data || []);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch reviews", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the review.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/applications/moderator/reviews/${id}`);
        Swal.fire("Deleted!", "Review has been deleted.", "success");
        fetchReviews();
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete review", "error");
      }
    }
  };

  if (loading) return <div className="text-center py-8 text-black">Loading reviews...</div>;

  return (
    <div className="p-4 min-h-screen bg-gray-50 text-black">
      <h1 className="text-2xl font-bold mb-4 text-indigo-700">All Reviews</h1>

      {reviews.length === 0 ? (
        <div className="text-center text-black">No reviews found.</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full divide-y divide-gray-200 text-black">
            <thead className="bg-gray-50 text-black">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Scholarship</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Feedback</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-black">
              {reviews.map((rev) => (
                <tr key={rev._id}>
                  <td className="px-6 py-4 text-black">{rev.studentName || rev.studentEmail}</td>
                  <td className="px-6 py-4 text-black">{rev.scholarshipName}</td>
                  <td className="px-6 py-4 text-black">{rev.feedback}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(rev._id)}
                      className="px-2 py-1 text-red-600 border border-red-200 rounded hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
