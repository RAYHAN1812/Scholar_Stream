import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

export default function ScholarshipDetails() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  // Fetch scholarship details
  const fetchScholarship = async () => {
    try {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      setScholarship(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch scholarship", "error");
    }
  };

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await axiosSecure.get(`/scholarships/${id}/reviews`);
      setReviews(res.data || []);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch reviews", "error");
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchScholarship(), fetchReviews()]).finally(() =>
      setLoading(false)
    );
  }, [id]);

  // Apply button handler
  const handleApply = () => {
    if (!scholarship?._id) {
      console.error("Scholarship data not ready:", scholarship);
      Swal.fire("Error", "Scholarship ID not found. Please try again.", "error");
      return;
    }

    console.log("Navigating to checkout for scholarship:", scholarship);
    navigate(`/checkout/${scholarship._id.toString()}`);
  };

  // Submit review
  const handleReviewSubmit = async () => {
    if (!reviewText) return Swal.fire("Error", "Enter a review", "error");
    if (!user) return Swal.fire("Error", "You must be logged in to submit a review", "error");

    try {
      await axiosSecure.post(`/scholarships/${id}/reviews`, {
        scholarshipId: id,
        universityName: scholarship?.universityName || "",
        userName: user?.name || "Anonymous",
        userEmail: user?.email || "",
        userImage: user?.image || "",
        ratingPoint: rating || 0,
        reviewComment: reviewText,
      });
      Swal.fire("Success", "Review submitted!", "success");
      setReviewText("");
      setRating(0);
      fetchReviews();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to submit review", "error");
    }
  };

  if (loading)
    return (
      <div className="text-center py-8">
        <div className="animate-spin h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4 rounded-full"></div>
        Loading scholarship...
      </div>
    );

  if (!scholarship)
    return (
      <div className="text-center py-8 text-red-600">
        Scholarship not found.
      </div>
    );

  return (
    <div className="container mx-auto p-4 min-h-screen">
      {/* Scholarship Info */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">{scholarship.scholarshipName}</h1>
        <p className="text-lg font-semibold mb-1">{scholarship.universityName}</p>
        <p className="mb-1">
          {scholarship.universityCountry || "N/A"} - {scholarship.universityCity || "N/A"}
        </p>
        <p className="mb-1">Degree: {scholarship.degree || "N/A"}</p>
        <p className="mb-1">Category: {scholarship.scholarshipCategory || "N/A"}</p>
        <p className="mb-1">Application Fee: ${scholarship.applicationFee || 0}</p>
        <p className="mb-1">
          Deadline: {scholarship.applicationDeadline
            ? new Date(scholarship.applicationDeadline).toLocaleDateString()
            : "N/A"}
        </p>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          disabled={!scholarship}
          className={`mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded ${
            !scholarship ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {scholarship ? "Apply Now" : "Loading..."}
        </button>
      </div>

      {/* Reviews Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>

        {/* Add Review */}
        <div className="mb-6">
          <textarea
            className="w-full p-2 border rounded mb-2 dark:bg-gray-700 dark:text-white"
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <input
            type="number"
            min={0}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            placeholder="Rating (0-5)"
            className="w-24 p-1 border rounded mb-2"
          />
          <button
            onClick={handleReviewSubmit}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            Submit Review
          </button>
        </div>

        {/* Review List */}
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div key={rev._id} className="border-b pb-2 dark:border-gray-600">
                <p className="font-semibold">{rev.userName || "Anonymous"}</p>
                <p>{rev.reviewComment}</p>
                <p className="text-sm text-gray-500">
                  {rev.reviewDate ? new Date(rev.reviewDate).toLocaleDateString() : ""}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
