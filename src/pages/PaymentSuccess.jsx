import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PaymentSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { applicationData, amount } = state || {};

  const displayAmount = amount
    ? (amount / 100).toFixed(2) // Stripe returns amount in cents
    : applicationData?.applicationFees?.toFixed(2) || '0.00';

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display">
      {/* Top App Bar */}
      <div className="flex items-center p-4">
        <div className="flex size-12 shrink-0 items-center justify-start">
          <span
            className="material-symbols-outlined text-zinc-500 dark:text-zinc-400 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            arrow_back_ios_new
          </span>
        </div>
        <h2 className="flex-1 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-zinc-900 dark:text-white">
          Confirmation
        </h2>
        <div className="size-12 shrink-0"></div>
      </div>

      {/* Main Content */}
      <div className="flex w-full flex-1 flex-col px-4 pt-8 pb-6">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
            <span className="material-symbols-outlined text-5xl text-green-500">check</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="pt-6 pb-2 text-center text-3xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-white">
          Payment Successful!
        </h1>

        {/* Body Text */}
        <p className="px-4 pb-8 text-center text-base font-normal leading-normal text-zinc-600 dark:text-zinc-400">
          Your application fee has been processed. You're one step closer to your goal.
        </p>

        {/* Details */}
        <div className="w-full space-y-4 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 p-6">
          <div className="flex justify-between border-b border-b-zinc-200 dark:border-b-zinc-700 pb-4">
            <p className="text-sm font-normal text-zinc-500 dark:text-zinc-400">Amount Paid</p>
            <p className="text-sm font-medium text-zinc-900 dark:text-white">${displayAmount} USD</p>
          </div>
          {applicationData && (
            <>
              <div className="flex justify-between border-b border-b-zinc-200 dark:border-b-zinc-700 pb-4 pt-2">
                <p className="text-sm font-normal text-zinc-500 dark:text-zinc-400">Scholarship</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">{applicationData.scholarshipName}</p>
              </div>
              <div className="flex justify-between border-b border-b-zinc-200 dark:border-b-zinc-700 pb-4 pt-2">
                <p className="text-sm font-normal text-zinc-500 dark:text-zinc-400">University</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">{applicationData.universityName}</p>
              </div>
              <div className="flex justify-between pt-2">
                <p className="text-sm font-normal text-zinc-500 dark:text-zinc-400">Transaction ID</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">{applicationData.transactionId || 'N/A'}</p>
              </div>
            </>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Action Buttons */}
        <div className="w-full space-y-4 pt-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex h-12 w-full items-center justify-center rounded-xl bg-primary px-6 text-base font-bold text-white transition-colors hover:bg-primary/90"
          >
            Go to My Applications
          </button>
          <button
            onClick={() => window.print()}
            className="flex h-12 w-full items-center justify-center rounded-xl bg-transparent px-6 text-base font-bold text-primary transition-colors hover:bg-primary/10"
          >
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
