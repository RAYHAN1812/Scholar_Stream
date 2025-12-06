import React from 'react';

export default function StudentDashboard() {
  // Mock user data (replace with real data from API or context)
  const user = {
    name: 'Micah W.',
    email: 'micah.w@email.com',
    school: 'University of Tech',
    major: 'Computer Science',
    gpa: '3.8 / 4.0',
    graduation: 'May 2025',
    profilePic: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy36NRvncsx6jyl-fha2HKCRPFWrET9jelpRHHkdoRogNjPutCXJxkSLldCDBceEHSMXSMdvRwp6MWytcp5CZnUXuvYP6PAyXqsEabm96f3nzMODkOWeSthnY8kNlZw6NYIRbomughBbilyYg6Kj9NsnoeDQN23pOcILC8McqOVGjYRg6DoZfIg5cApWjwq_MCdOYXqFajPeaP_U01DgSLQ3vRo2VA_FeE593PRzs93Bxv-0B0He8wDvBrULrdLHDCIp141TJ4QzPv'
  };

  const applications = [
    { name: 'Future Engineer Scholarship', status: 'Submitted' },
    { name: 'Innovation in Tech Grant', status: 'Draft' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-surface-light dark:bg-surface-dark shadow-sm">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg
              className="w-8 h-8 text-teal"
              fill="none"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0ZM28.536 29.95C25.688 32.8 21.6 34 18 34C11.373 34 6 28.627 6 22C6 15.373 11.373 10 18 10C21.6 10 25.688 11.2 28.536 14.05L26.414 16.172C24.343 14.1 21.435 13 18 13C13.029 13 9 17.029 9 22C9 26.971 13.029 31 18 31C21.435 31 24.343 29.9 26.414 27.828L28.536 29.95ZM32 23H22V20H35V23H32Z"
                fill="currentColor"
              ></path>
            </svg>
            <span className="text-xl font-bold text-text-light dark:text-text-dark">
              ScholarStream
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              className="hidden sm:block text-sm font-medium text-subtext-light dark:text-subtext-dark hover:text-primary"
              href="#"
            >
              Home
            </a>
            <a
              className="hidden sm:block text-sm font-medium text-subtext-light dark:text-subtext-dark hover:text-primary"
              href="#"
            >
              All Scholarships
            </a>
            <div className="relative">
              <button>
                <img
                  alt={`${user.name} profile`}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-primary"
                  src={user.profilePic}
                />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main */}
      <main className="flex-grow container mx-auto p-4 flex flex-col lg:flex-row lg:space-x-8">
        {/* Sidebar */}
        <aside className="mb-6 lg:mb-0 lg:w-1/4">
          <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-bold mb-4 text-text-light dark:text-text-dark">
              Student Dashboard
            </h2>
            <nav className="flex flex-row lg:flex-col justify-around lg:justify-start lg:space-y-2 -mx-2">
              <a
                className="flex items-center px-4 py-2 rounded-lg bg-primary/10 text-primary font-semibold border-l-4 border-primary"
                href="#profile"
              >
                <span className="material-icons-outlined mr-3">person</span>
                Profile
              </a>
              <a
                className="flex items-center px-4 py-2 rounded-lg text-subtext-light dark:text-subtext-dark hover:bg-primary/10 hover:text-primary"
                href="#applications"
              >
                <span className="material-icons-outlined mr-3">article</span>
                My Applications
              </a>
              <a
                className="flex items-center px-4 py-2 rounded-lg text-subtext-light dark:text-subtext-dark hover:bg-primary/10 hover:text-primary"
                href="#reviews"
              >
                <span className="material-icons-outlined mr-3">reviews</span>
                My Reviews
              </a>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="w-full lg:w-3/4 space-y-6">
          {/* Profile Section */}
          <div id="profile" className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4 mb-6">
              <img
                alt={`${user.name} profile`}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-primary/50"
                src={user.profilePic}
              />
              <div>
                <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">{user.name}</h3>
                <p className="text-subtext-light dark:text-subtext-dark">{user.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="font-semibold text-text-light dark:text-text-dark">School:</strong> {user.school}
              </div>
              <div>
                <strong className="font-semibold text-text-light dark:text-text-dark">Major:</strong> {user.major}
              </div>
              <div>
                <strong className="font-semibold text-text-light dark:text-text-dark">GPA:</strong> {user.gpa}
              </div>
              <div>
                <strong className="font-semibold text-text-light dark:text-text-dark">Graduation:</strong> {user.graduation}
              </div>
            </div>
            <button className="mt-6 w-full sm:w-auto bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
              Edit Profile
            </button>
          </div>

          {/* Applications Section */}
          <div id="applications" className="space-y-6">
            <h2 className="text-2xl font-bold">My Applications</h2>
            <div className="bg-surface-light dark:bg-surface-dark p-4 sm:p-6 rounded-lg shadow-sm overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border-light dark:border-border-dark">
                    <th className="py-2 pr-2 font-semibold">Scholarship</th>
                    <th className="py-2 px-2 font-semibold">Status</th>
                    <th className="py-2 pl-2 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, idx) => (
                    <tr key={idx} className="border-b border-border-light dark:border-border-dark">
                      <td className="py-3 pr-2 font-medium">{app.name}</td>
                      <td className="py-3 px-2">
                        <span
                          className={`text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full ${
                            app.status === 'Submitted'
                              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                              : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3 pl-2 text-right">
                        <button className="p-1.5 rounded-full hover:bg-border-light dark:hover:bg-border-dark">
                          <span className="material-icons-outlined text-base text-subtext-light dark:text-subtext-dark">visibility</span>
                        </button>
                        <button className="p-1.5 rounded-full hover:bg-border-light dark:hover:bg-border-dark">
                          <span className="material-icons-outlined text-base text-subtext-light dark:text-subtext-dark">edit</span>
                        </button>
                        {app.status === 'Draft' && (
                          <button className="bg-teal text-white text-xs font-bold px-3 py-1 rounded-full hover:opacity-90">Pay</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Reviews Section */}
          <div id="reviews" className="space-y-6">
            <h2 className="text-2xl font-bold">My Reviews</h2>
            <div className="bg-surface-light dark:bg-surface-dark p-4 sm:p-6 rounded-lg shadow-sm">
              <div className="text-center py-8">
                <span className="material-icons-outlined text-5xl text-subtext-light dark:text-subtext-dark mb-2">rate_review</span>
                <p className="text-subtext-light dark:text-subtext-dark">You haven't written any reviews yet.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-light dark:bg-surface-dark mt-12 border-t border-border-light dark:border-border-dark">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <svg className="w-7 h-7 text-teal" fill="none" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0ZM28.536 29.95C25.688 32.8 21.6 34 18 34C11.373 34 6 28.627 6 22C6 15.373 11.373 10 18 10C21.6 10 25.688 11.2 28.536 14.05L26.414 16.172C24.343 14.1 21.435 13 18 13C13.029 13 9 17.029 9 22C9 26.971 13.029 31 18 31C21.435 31 24.343 29.9 26.414 27.828L28.536 29.95ZM32 23H22V20H35V23H32Z"
                fill="currentColor"
              ></path>
            </svg>
            <span className="text-lg font-bold">ScholarStream</span>
          </div>
          <p className="text-sm text-subtext-light dark:text-subtext-dark">© 2024 ScholarStream. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
