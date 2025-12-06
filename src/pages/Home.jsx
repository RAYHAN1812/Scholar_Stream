import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScholarships } from '../context/ScholarshipContext';
import ScholarshipCard from '../components/ScholarshipCard';

export default function Home() {
  const { scholarships, loading, error } = useScholarships();

  if (loading) return <div className="text-center p-8">Loading scholarships...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error.message}</div>;

  const top = scholarships && scholarships.length > 0
    ? [...scholarships]
        .sort((a, b) => new Date(b.scholarshipPostDate) - new Date(a.scholarshipPostDate))
        .slice(0, 6)
    : [];

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Find <span className="text-primary">Scholarships for College</span>
            </h1>
            <ul className="space-y-4 mb-8 text-slate-600 dark:text-slate-300 max-w-md mx-auto md:mx-0">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                <span>Scholarships for <span className="font-semibold text-slate-800 dark:text-slate-100">every type</span> of student</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="font-semibold text-slate-800 dark:text-slate-100">100% free</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>shield_lock</span>
                <span className="font-semibold text-slate-800 dark:text-slate-100">Vetted</span><span> scholarship opportunities</span>
              </li>
            </ul>
            <Link
              to="/scholarships"
              className="w-full max-w-sm mx-auto md:mx-0 bg-primary text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:opacity-90 transition-opacity text-lg inline-block text-center"
            >
              Find Scholarships Now
            </Link>
          </div>
          <div className="relative mt-8 md:mt-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxm7QI370Rx-5UKa9RPg9W6Es5nmwTRB0uY-nu3_MGuL_Q1eLKBoReO6K2TQ8A6JTGHbKdK2APMJoLOj2OeyZ_m-zlgSgdoNAkqIrNQuFe0UznpeoZCd8RVgft776-PD_OWSEOB1unpG0km04BTf9M4U1_Nif2B9dgttu1a_UUrKVuv313oahEHpfc60F4cC3WkmWCafmWoHeGszyRXIq8Ev6d9abBSY64HHUxHTSeu28iDNpn7KBltjcph_B6HBLCODMhk3S62e11"
              alt="Happy student"
              className="rounded-2xl shadow-xl w-full h-auto object-cover max-w-sm mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Top Scholarships */}
      <section className="bg-slate-100 dark:bg-slate-800/50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-10">Top Scholarships</h2>
          {top.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {top.map(s => <ScholarshipCard key={s._id} sch={s} />)}
            </div>
          ) : (
            <p className="text-center text-slate-600 dark:text-slate-400">No scholarships available at the moment.</p>
          )}
          <div className="text-center mt-10">
            <Link
              to="/scholarships"
              className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold py-3 px-6 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors inline-block"
            >
              View All Scholarships
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-10">Success Stories</h2>
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl text-center">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxm7QI370Rx-5UKa9RPg9W6Es5nmwTRB0uY-nu3_MGuL_Q1eLKBoReO6K2TQ8A6JTGHbKdK2APMJoLOj2OeyZ_m-zlgSgdoNAkqIrNQuFe0UznpeoZCd8RVgft776-PD_OWSEOB1unpG0km04BTf9M4U1_Nif2B9dgttu1a_UUrKVuv313oahEHpfc60F4cC3WkmWCafmWoHeGszyRXIq8Ev6d9abBSY64HHUxHTSeu28iDNpn7KBltjcph_B6HBLCODMhk3S62e11"
              alt="Micah W."
              className="w-16 h-16 rounded-full mx-auto -mt-12 mb-4 border-4 border-background-light dark:border-background-dark shadow-md"
            />
            <blockquote className="text-slate-600 dark:text-slate-400 italic mb-4">
              "My experience with ScholarStream was amazing. The site is super easy to use, making it easier to find a variety of scholarships all in one place. It saved me hours..."
            </blockquote>
            <cite className="font-bold text-slate-800 dark:text-slate-100 not-italic">Micah W.</cite>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-100 dark:bg-slate-800/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-10">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            <details className="group bg-background-light dark:bg-background-dark p-4 rounded-lg shadow-sm cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-slate-800 dark:text-slate-100">
                Is ScholarStream really free?
                <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">expand_more</span>
              </summary>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Yes, absolutely. Our platform is 100% free for students to use. We believe access to financial aid information should be available to everyone.
              </p>
            </details>
            <details className="group bg-background-light dark:bg-background-dark p-4 rounded-lg shadow-sm cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-slate-800 dark:text-slate-100">
                How are scholarships vetted?
                <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">expand_more</span>
              </summary>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Our team carefully reviews every scholarship listing to ensure it comes from a reputable source and is a legitimate opportunity for students.
              </p>
            </details>
            <details className="group bg-background-light dark:bg-background-dark p-4 rounded-lg shadow-sm cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-slate-800 dark:text-slate-100">
                How do I apply for scholarships?
                <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">expand_more</span>
              </summary>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                ScholarStream is a directory. When you find a scholarship you're interested in, we provide a direct link to the provider's official application page.
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
