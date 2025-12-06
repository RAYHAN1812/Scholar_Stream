import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PaymentFailed() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { applicationData, error } = state || {};

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display">
      {/* Top App Bar */}
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
        <button
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-zinc-700 dark:text-zinc-300"
          onClick={() => navigate(-1)}
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-zinc-900 dark:text-white pr-10">
          Payment Status
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center px-4 pt-8 pb-6 text-center">
        {/* Status Icon */}
        <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-red-500/10">
          <div className="flex size-16 items-center justify-center rounded-full bg-red-500/20">
            <span className="material-symbols-outlined text-4xl text-red-500">close</span>
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-zinc-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">
          Payment Failed
        </h2>

        {/* Body Text */}
        <p className="mt-2 max-w-sm text-zinc-600 dark:text-zinc-400 text-base font-normal leading-normal">
          {error || "We were unable to process your payment. Please check your payment details and try again."}
        </p>

        {/* Information Card */}
        {applicationData && (
          <div className="mt-8 w-full max-w-md rounded-xl bg-white dark:bg-zinc-800/50 p-5 text-left shadow-sm">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Scholarship</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{applicationData.scholarshipName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">University</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{applicationData.universityName}</span>
              </div>
              <div className="my-4 h-px w-full bg-zinc-200 dark:bg-zinc-700"></div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Amount</span>
                <span className="text-lg font-bold text-zinc-900 dark:text-white">
                  ${applicationData.applicationFees?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Transaction ID</span>
                <span className="font-mono text-sm text-zinc-600 dark:text-zinc-300">
                  {applicationData.transactionId || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex-grow"></div>

        {/* Action Buttons */}
        <div className="w-full max-w-md space-y-4 pt-8">
          <button
            className="flex h-12 w-full items-center justify-center rounded-xl bg-primary px-6 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onClick={() => navigate(-1)}
          >
            Retry Payment
          </button>
          <button
            className="flex h-12 w-full items-center justify-center rounded-xl bg-transparent px-6 text-base font-semibold text-primary transition-colors hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onClick={() => window.location.href = 'mailto:support@scholarstream.com'}
          >
            Contact Support
          </button>
        </div>
      </main>
    </div>
  );
}
