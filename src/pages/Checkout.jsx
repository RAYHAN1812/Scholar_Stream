import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ clientSecret, applicationData, paymentIntentId }) {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });

    try {
      if (error) {
        // Save application as unpaid
        await axiosSecure.post("/student/apply", {
          ...applicationData,
          paymentStatus: "unpaid",
          paymentIntentId,
          amount: applicationData.amount,
        });
        Swal.fire("Payment Failed", error.message || "Payment failed.", "error");
        navigate("/payment/failed", { state: { scholarshipName: applicationData.scholarshipName, error: error.message } });
      } else if (paymentIntent.status === "succeeded") {
        // Save application as paid
        await axiosSecure.post("/student/apply", {
          ...applicationData,
          paymentStatus: "paid",
          paymentIntentId: paymentIntent.id,
          amount: applicationData.amount,
        });
        navigate("/payment/success", { state: { application: applicationData } });
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to save application", "error");
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Pay ${applicationData.applicationFee}</h2>
      <CardElement className="p-2 border rounded mb-4" />
      <button type="submit" disabled={processing} className="bg-indigo-600 text-white py-2 px-4 rounded">
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const { scholarshipId } = useParams();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [applicationData, setApplicationData] = useState(null);
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!scholarshipId) {
      Swal.fire("Error", "Scholarship ID missing", "error");
      navigate("/dashboard");
      return;
    }

    const createPaymentIntent = async () => {
      try {
        const res = await axiosSecure.post("/student/create-payment-intent", { scholarshipId });
        setClientSecret(res.data.clientSecret);
        setApplicationData(res.data.applicationData);
        setPaymentIntentId(res.data.paymentIntentId);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to initialize payment", "error");
        navigate("/dashboard");
      }
    };

    createPaymentIntent();
  }, [scholarshipId]);

  if (!clientSecret || !applicationData) return <p className="text-center py-8">Loading payment...</p>;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm clientSecret={clientSecret} applicationData={applicationData} paymentIntentId={paymentIntentId} />
    </Elements>
  );
}
