import React from 'react';

const applications = [
  {
    id: 1,
    scholarship: 'Tech Innovators Scholarship',
    applicant: 'Jane Doe',
    status: 'Pending',
    submitted: '2 days ago',
  },
  {
    id: 2,
    scholarship: 'Future Leaders Grant',
    applicant: 'John Smith',
    status: 'Pending',
    submitted: '5 days ago',
  },
];

export default function ModeratorDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-card-light dark:bg-card-dark border-b border-border-light dark:border-border-dark shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a className="flex items-center gap-2 text-xl font-bold text-text-primary-light dark:text-text-primary-dark" href="#">
              <span className="material-icons text-brand-teal text-3xl">school</span>
              <span>ScholarStream</span>
            </a>
            <div>
              <button className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnni9xXjVb0x6DF65YWl4TdQXBaQZiCltMhhON4lqBi8vSta4wUrl0-2fVDaqXogNJFlqj6upexuQx3pKIQT-7bmAPCOchXPbjrLTZXg1APHmTpSVoluBHKtwxMpoaV_6-r7k5mZnZwkWfdilzsTQI8_onLcSIAwJlsvukBNxivCN8_bHEpTbGosPx5FJXX5uT88CPj4amcYF1rKUwf3RxpbU-EIEBNLWpqL7LmEohPl_wUOm1hPz4SDGAlFQlTuLhPHP5OwMjz3y8"
                  alt="Moderator profile"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-1">
          Moderator Dashboard
        </h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">Welcome, Alex M.</p>

        {/* Tabs */}
        <div className="mb-6 border-b border-border-light dark:border-border-dark">
          <nav className="-mb-px flex space-x-4">
            <a
              href="#"
              className="whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm text-brand-teal border-brand-teal"
            >
              Manage Applications
            </a>
            <a
              href="#"
              className="whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:border-gray-300 dark:hover:border-gray-500 border-transparent"
            >
              Manage Reviews
            </a>
            <a
              href="#"
              className="whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:border-gray-300 dark:hover:border-gray-500 border-transparent"
            >
              Profile
            </a>
          </nav>
        </div>

        {/* Pending Applications */}
        <section id="manage-applications">
          <h2 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
            Pending Applications
          </h2>

          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-card-light dark:bg-card-dark rounded-lg shadow-md mb-4 overflow-hidden"
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-text-primary-light dark:text-text-primary-dark">
                      {app.scholarship}
                    </p>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Applicant: {app.applicant}
                    </p>
                  </div>
                  <span className="text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 px-2.5 py-0.5 rounded-full">
                    {app.status}
                  </span>
                </div>
                <p className="text-sm mt-3 text-text-secondary-light dark:text-text-secondary-dark">
                  Submitted: {app.submitted}
                </p>
              </div>
              <div className="flex border-t border-border-light dark:border-border-dark">
                <button className="flex-1 p-3 text-sm font-medium text-center text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  Update Status
                </button>
                <div className="border-l border-border-light dark:border-border-dark"></div>
                <button className="flex-1 p-3 text-sm font-medium text-center text-green-600 dark:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  Send Feedback
                </button>
              </div>
            </div>
          ))}

          {/* Loading Skeleton */}
          <div className="animate-pulse bg-card-light dark:bg-card-dark rounded-lg shadow-md mb-4 p-4">
            <div className="flex justify-between items-center">
              <div className="w-2/3 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
              <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mt-4"></div>
            <div className="h-12 border-t border-border-light dark:border-border-dark mt-4"></div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card-light dark:bg-card-dark border-t border-border-light dark:border-border-dark">
        <div className="container mx-auto px-4 py-6 text-center">
          <div className="flex items-center justify-center gap-2 text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
            <span className="material-icons text-brand-teal text-2xl">school</span>
            <span>ScholarStream</span>
          </div>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">
            © 2024 ScholarStream. All Rights Reserved.
          </p>
          <div className="flex justify-center space-x-6">
            {/* Social icons */}
            <a
              href="#"
              className="text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  clipRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  fillRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Facebook</span>
            </a>
            <a
              href="#"
              className="text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
