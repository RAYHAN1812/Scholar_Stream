import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
function CheckoutForm({ clientSecret, applicationData }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);

    const cardEl = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardEl },
    });

    if (error) {
      setErrorMsg(error.message);
      try {
        await axiosClient.post('/applications', { ...applicationData, paymentStatus: 'unpaid' });
      } catch (err) {
        console.error(err);
      }
      navigate('/payment-failed', { state: { applicationData, error: error.message } });
    } else {
      try {
        await axiosClient.post('/applications', { ...applicationData, paymentStatus: 'paid', paymentIntentId: paymentIntent.id });
        navigate('/payment-success', { state: { applicationData, amount: paymentIntent.amount } });
      } catch (err) {
        console.error(err);
        navigate('/payment-failed', { state: { applicationData, error: 'Saving application failed' } });
      }
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Card Details</label>
        <div className="mt-1 p-3 border rounded-lg bg-white dark:bg-slate-900">
          <CardElement options={{ hidePostalCode: true }} />
        </div>
      </div>
      {errorMsg && <div className="text-red-600">{errorMsg}</div>}
      <button
        disabled={processing}
        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-primary/30 transition-all duration-200 ease-in-out"
      >
        {processing ? 'Processing...' : 'Pay $10.00 & Apply'}
      </button>
    </form>
  );
}

export default function Checkout() {
  const { scholarshipId } = useParams();
  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState(null);
  const [applicationData, setApplicationData] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return navigate('/login');
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await axiosClient.post('/payments/create-payment-intent', { scholarshipId });
        setClientSecret(data.clientSecret);
        setApplicationData(data.applicationData);
      } catch (err) {
        console.error(err);
        navigate('/payment-failed', { state: { error: 'Payment initialization failed' } });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [scholarshipId]);

  if (loading) return <div className="flex justify-center py-20"><div className="spinner" /></div>;
  if (!clientSecret) return <div className="text-center py-20">Unable to initialize payment</div>;

  return (
    <div className="flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display">
      {/* Top App Bar */}
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
        <div className="text-slate-800 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <span className="material-symbols-outlined text-2xl cursor-pointer" onClick={() => navigate(-1)}>arrow_back</span>
        </div>
        <h1 className="text-slate-900 dark:text-white text-lg font-bold flex-1 text-center">Secure Checkout</h1>
        <div className="size-10 shrink-0"></div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 pt-4 pb-8">
        <div className="flex flex-col space-y-6 max-w-md mx-auto">
          {/* Amount Display */}
          <div className="text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">Total Due</p>
            <p className="text-4xl font-bold text-slate-900 dark:text-white mt-1">$10.00</p>
          </div>

          {/* Order Summary */}
          <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">Scholarship Application Fee</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Standard Application</p>
              </div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">$10.00</p>
            </div>
          </div>

          {/* Payment Form */}
          <Elements stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret} applicationData={applicationData} />
          </Elements>
        </div>
      </main>

      {/* Footer / CTA */}
      <footer className="sticky bottom-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm p-4 pt-2 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-md mx-auto flex items-center justify-center space-x-2">
          <span className="material-symbols-outlined text-base text-slate-400 dark:text-slate-500">lock</span>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Payments are secure and encrypted. Powered by Stripe.
          </p>
        </div>
      </footer>
    </div>
  );
}
