import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useScholarships } from "../context/ScholarshipContext";
import ScholarshipCard from "../components/ScholarshipCard";

export default function Home() {
  const { scholarships, loading, error, fetchScholarships } = useScholarships();

  // Fetch scholarships on mount
  useEffect(() => {
    fetchScholarships({ page: 1, limit: 12 });
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading scholarships...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-red-600 dark:text-red-400 font-semibold">Error loading scholarships</p>
          <p className="text-red-500 dark:text-red-300 text-sm">{error.message}</p>
        </div>
      </div>
    );

  // Sort and take top 6 scholarships
  const top =
    scholarships && scholarships.length > 0
      ? [...scholarships]
          .sort(
            (a, b) =>
              new Date(b.scholarshipPostDate) - new Date(a.scholarshipPostDate)
          )
          .slice(0, 6)
      : [];

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-blue-50 to-indigo-50 dark:from-primary-950 dark:via-slate-900 dark:to-primary-900 py-16 md:py-24 border-b-4 border-primary-500">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-10 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-0 right-10 w-72 h-72 bg-accent-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <div className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-primary-500 to-indigo-600 rounded-full shadow-lg">
                <span className="text-white font-bold text-sm">✨ Find Your Opportunity</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-primary-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Find Scholarships
                </span>
                <br />
                <span className="text-slate-900 dark:text-white">for Your Future</span>
              </h1>
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
                Discover and apply for verified scholarships tailored to your profile. Trusted by thousands of students.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start">
                <Link
                  to="/scholarships"
                  className="w-full sm:w-auto bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Explore Scholarships →
                </Link>
                <Link
                  to="/register"
                  className="w-full sm:w-auto bg-white dark:bg-slate-800 border-2 border-primary-500 text-primary-600 dark:text-primary-400 font-bold py-4 px-8 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-700 transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-indigo-600 rounded-3xl blur-2xl opacity-50 animate-pulse"></div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxm7QI370Rx-5UKa9RPg9W6Es5nmwTRB0uY-nu3_MGuL_Q1eLKBoReO6K2TQ8A6JTGHbKdK2APMJoLOj2OeyZ_m-zlgSgdoNAkqIrNQuFe0UznpeoZCd8RVgft776-PD_OWSEOB1unpG0km04BTf9M4U1_Nif2B9dgttu1a_UUrKVuv313oahEHpfc60F4cC3WkmWCafmWoHeGszyRXIq8Ev6d9abBSY64HHUxHTSeu28iDNpn7KBltjcph_B6HBLCODMhk3S62e11"
                alt="Happy student"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Top Scholarships Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-900 dark:to-primary-950 border-b-4 border-accent-500">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 font-bold rounded-full text-sm mb-4">
              Featured Opportunities
            </span>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Top Scholarships
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Discover amazing opportunities from top institutions and organizations
            </p>
          </div>

          {top.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {top.map((s) => (
                <ScholarshipCard key={s._id} sch={s} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-xl border-2 border-dashed border-primary-300 dark:border-primary-700">
              <p className="text-slate-600 dark:text-slate-400 text-lg font-semibold">
                No scholarships available at the moment.
              </p>
            </div>
          )}

          <div className="text-center">
            <Link
              to="/scholarships"
              className="inline-block bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white font-bold py-3 px-10 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              View All Scholarships →
            </Link>
          </div>
        </div>
      </section>

      {/* Other sections (Success Stories, How it Works, FAQ, CTA) remain unchanged */}
      {/* Copy your existing sections below as-is */}
    </main>
  );
}
