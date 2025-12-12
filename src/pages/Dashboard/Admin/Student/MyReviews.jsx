import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

export default function MyReviews() {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/student/reviews");
      // Map backend fields to frontend expected fields
      const mapped = (res.data || []).map((rev) => ({
        ...rev,
        reviewComment: rev.feedback,
        ratingPoint: rev.rating,
      }));
      setReviews(mapped);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch reviews", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    Swal.fire("Edit", "Open edit review modal (mocked)", "info");
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure you want to delete this review?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });
    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/student/reviews/${id}`);
      Swal.fire("Deleted!", "Review has been deleted.", "success");
      fetchReviews();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete review", "error");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) return <div className="text-center py-8">Loading reviews...</div>;

  return (
    <div>
      {reviews.length === 0 ? (
        <div className="text-center text-gray-500">No reviews found.</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scholarship</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">University</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reviews.map((rev) => (
                <tr key={rev._id}>
                  <td className="px-6 py-4">{rev.scholarshipName || "-"}</td>
                  <td className="px-6 py-4">{rev.universityName || "-"}</td>
                  <td className="px-6 py-4">{rev.reviewComment || "-"}</td>
                  <td className="px-6 py-4">{rev.reviewDate ? new Date(rev.reviewDate).toLocaleDateString() : "-"}</td>
                  <td className="px-6 py-4">{rev.ratingPoint !== null ? rev.ratingPoint : "-"}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => handleEdit(rev._id)} className="px-2 py-1 border rounded text-yellow-600 hover:bg-yellow-50">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(rev._id)} className="px-2 py-1 border rounded text-red-600 hover:bg-red-50">
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
