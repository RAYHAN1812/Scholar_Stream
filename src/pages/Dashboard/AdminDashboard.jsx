import React from 'react';

const scholarships = [
  { id: 1, title: 'Future Engineer Scholarship', amount: '$40,000', status: 'Active' },
  { id: 2, title: 'Women in STEM Grant', amount: '$15,000', status: 'Active' },
  { id: 3, title: 'Creative Arts Award', amount: '$5,000', status: 'Pending' },
];

export default function AdminDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      {/* Header */}
      <header className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark sticky top-0 z-20">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-icons-outlined text-primary text-3xl">school</span>
            <span className="font-bold text-xl text-text-light dark:text-text-dark">ScholarStream</span>
          </div>
          <div className="flex items-center gap-4">
            <a className="text-sm font-medium text-subtle-light dark:text-subtle-dark hover:text-primary" href="#">Home</a>
            <a className="text-sm font-medium text-subtle-light dark:text-subtle-dark hover:text-primary" href="#">Scholarships</a>
            <div className="relative">
              <button id="profile-menu-button">
                <img className="h-8 w-8 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYUDDz0N4MdGO47pM0DfHi_djD8Qw2vN0vqiCVHsXGQiAyYuNjTHOOiCz4tz1rIo3Bsx5SDNvi4XeVFxk9R3Ol3oy6JxnOaeCMbsKxAn0O5DGwqWytQHLI4PHx5BNoRy5k7qWen_JWfYBrTTs-IKP3s4Nn4gVB1Or1LFGK0EcWY08h58R1MaUmxSWROyUGyonSYZNGgsCAuVYBbx4NqxME_KNxdoHMDjDfyEPCZMW1Hhtyzs9pT46wf5HfQvkejXE4iktHHOKSRkxw"
                  alt="User profile"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-20 md:w-64 bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark p-2 md:p-4 flex flex-col items-center md:items-start transition-all duration-300">
          <nav className="flex flex-col space-y-2 w-full">
            <a className="flex items-center gap-4 p-3 rounded-lg text-subtle-light dark:text-subtle-dark hover:bg-primary/10 hover:text-primary dark:hover:text-primary" href="#">
              <span className="material-icons-outlined text-xl">person</span>
              <span className="hidden md:inline font-medium">Profile</span>
            </a>
            <a className="flex items-center gap-4 p-3 rounded-lg text-subtle-light dark:text-subtle-dark hover:bg-primary/10 hover:text-primary dark:hover:text-primary" href="#">
              <span className="material-icons-outlined text-xl">add_circle_outline</span>
              <span className="hidden md:inline font-medium">Add Scholarship</span>
            </a>
            <a className="active-link flex items-center gap-4 p-3 rounded-lg" href="#">
              <span className="material-icons-outlined text-xl">article</span>
              <span className="hidden md:inline font-medium">Manage Scholarships</span>
            </a>
            <a className="flex items-center gap-4 p-3 rounded-lg text-subtle-light dark:text-subtle-dark hover:bg-primary/10 hover:text-primary dark:hover:text-primary" href="#">
              <span className="material-icons-outlined text-xl">group</span>
              <span className="hidden md:inline font-medium">Manage Users</span>
            </a>
            <a className="flex items-center gap-4 p-3 rounded-lg text-subtle-light dark:text-subtle-dark hover:bg-primary/10 hover:text-primary dark:hover:text-primary" href="#">
              <span className="material-icons-outlined text-xl">analytics</span>
              <span className="hidden md:inline font-medium">Analytics</span>
            </a>
          </nav>
        </aside>

        {/* Dashboard Main */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-text-light dark:text-text-dark mb-6">Manage Scholarships</h1>

          <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-sm border border-border-light dark:border-border-dark p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-text-light dark:text-text-dark">All Scholarships</h2>
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90">
                <span className="material-icons-outlined text-base">add</span>
                <span>New</span>
              </button>
            </div>

            {/* Skeleton Loading */}
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="space-y-2">
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto hidden">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border-light dark:border-border-dark text-subtle-light dark:text-subtle-dark">
                  <tr>
                    <th className="p-3">Title</th>
                    <th className="p-3 hidden md:table-cell">Amount</th>
                    <th className="p-3 hidden md:table-cell">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {scholarships.map((s) => (
                    <tr key={s.id} className="border-b border-border-light dark:border-border-dark">
                      <td className="p-3 font-medium">{s.title}</td>
                      <td className="p-3 hidden md:table-cell">{s.amount}</td>
                      <td className="p-3 hidden md:table-cell">
                        <span className={`px-2 py-1 rounded-full text-xs ${s.status === 'Active' ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' : 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300'}`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button className="text-subtle-light dark:text-subtle-dark hover:text-primary p-1">
                          <span className="material-icons-outlined text-lg">edit</span>
                        </button>
                        <button className="text-subtle-light dark:text-subtle-dark hover:text-red-500 p-1">
                          <span className="material-icons-outlined text-lg">delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark mt-auto">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
          <div className="flex items-center gap-2">
            <span className="material-icons-outlined text-primary text-2xl">school</span>
            <span className="font-bold text-lg text-text-light dark:text-text-dark">ScholarStream</span>
          </div>
          <p className="text-sm text-subtle-light dark:text-subtle-dark">© 2024 ScholarStream. All rights reserved.</p>
          <div className="flex gap-4">
            <a className="text-subtle-light dark:text-subtle-dark hover:text-primary" href="#">
              <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path>
              </svg>
              <span className="sr-only">Facebook</span>
            </a>
            <a className="text-subtle-light dark:text-subtle-dark hover:text-primary" href="#">
              <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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
