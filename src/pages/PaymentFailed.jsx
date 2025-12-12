import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentFailed() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const scholarshipName = state?.scholarshipName;
  const errorMessage = state?.error;

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded text-center">
      <h1 className="text-2xl font-bold mb-4 text-red-600">Payment Failed</h1>
      <p className="mb-2">Scholarship: {scholarshipName}</p>
      {errorMessage && <p className="mb-2 text-gray-700">{errorMessage}</p>}
      <button
        onClick={() => navigate("/dashboard/my-applications")}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
      >
        Return to Dashboard
      </button>
    </div>
  );
}
