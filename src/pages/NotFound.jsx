import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col items-center justify-center overflow-x-hidden p-4 bg-background-light dark:bg-background-dark font-display">
      <div className="flex h-full w-full max-w-md flex-1 flex-col items-center justify-center px-4 py-8 text-center">
        <div className="flex flex-col items-center gap-6">
          {/* Icon */}
          <div className="flex h-40 w-40 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="material-symbols-outlined !text-8xl">search_off</span>
          </div>

          {/* Text */}
          <div className="flex max-w-sm flex-col items-center gap-2">
            <p className="text-2xl font-bold leading-tight tracking-tight text-text-light-primary dark:text-text-dark-primary">
              Oops! Page Not Found
            </p>
            <p className="text-base font-normal leading-normal text-text-light-secondary dark:text-text-dark-secondary">
              We can't seem to find the page you're looking for. It might have been moved, renamed, or doesn't exist.
            </p>
          </div>

          {/* Button */}
          <button
            onClick={() => navigate('/')}
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-medium leading-normal tracking-wide shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
          >
            <span className="truncate">Go to Home Page</span>
          </button>
        </div>
      </div>
    </div>
  );
}
