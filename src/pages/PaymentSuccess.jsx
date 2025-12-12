import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const application = state?.application;

  if (!application) return <p className="text-center py-8">No payment info available</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded text-center">
      <h1 className="text-2xl font-bold mb-4 text-green-600">Payment Successful</h1>
      <p className="mb-2">Scholarship: {application.scholarshipName}</p>
      <p className="mb-2">University: {application.universityName}</p>
      <p className="mb-2">Amount Paid: ${application.amount / 100}</p>
      <button
        onClick={() => navigate("/dashboard/my-applications")}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
      >
        Go to My Applications
      </button>
    </div>
  );
}
