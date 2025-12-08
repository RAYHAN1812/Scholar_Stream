import React from "react";
import { Link } from "react-router-dom";
import { useScholarships } from "../context/ScholarshipContext";
import ScholarshipCard from "../components/ScholarshipCard";

export default function Home() {
  const { scholarships, loading, error } = useScholarships();

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
      {/* Hero Section with Bold Gradient */}
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

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t-2 border-primary-200 dark:border-primary-800">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent mb-2">1000+</div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-400">Scholarships</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-accent-500 to-green-600 bg-clip-text text-transparent mb-2">$50M+</div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-400">Available</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-warning to-orange-600 bg-clip-text text-transparent mb-2">100%</div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-400">Free</p>
                </div>
              </div>
            </div>

            {/* Hero Image with Animation */}
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

      {/* Success Stories Section */}
      <section className="py-20 bg-white dark:bg-slate-800 border-b-4 border-warning">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-warning/10 text-warning font-bold rounded-full text-sm mb-4">
              Real Success Stories
            </span>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-warning to-orange-600 bg-clip-text text-transparent">
              Student Testimonials
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              See how students like you found their dream scholarships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Micah W.",
                role: "Class of 2024",
                quote: "My experience with ScholarStream was amazing. The site is super easy to use, making it easier to find a variety of scholarships all in one place. It saved me hours of research!",
                color: "from-primary-500 to-indigo-500",
              },
              {
                name: "Sarah J.",
                role: "Class of 2025",
                quote: "I found three scholarships through ScholarStream that I actually qualified for. The verification process gave me peace of mind that these were legitimate opportunities.",
                color: "from-accent-500 to-green-500",
              },
              {
                name: "Alex M.",
                role: "International Student",
                quote: "As an international student, finding scholarships was intimidating. ScholarStream made it simple and helped me secure $15,000 in funding.",
                color: "from-warning to-orange-500",
              },
            ].map((story, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-8 border-l-4 border-gradient-primary shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-gradient-to-r ${story.color} h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                    {story.name[0]}
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-warning text-lg">★</span>
                    ))}
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-200 mb-6 italic leading-relaxed">
                  "{story.quote}"
                </p>
                <div>
                  <p className="font-bold text-slate-900 dark:text-slate-100">{story.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{story.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-r from-info/10 to-cyan-100 dark:from-info/5 dark:to-cyan-900/20 border-b-4 border-info">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-info/20 dark:bg-info/30 text-info dark:text-info font-bold rounded-full text-sm mb-4">
              Simple Process
            </span>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-info to-cyan-600 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Three simple steps to find your scholarship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { num: 1, title: "Create Profile", desc: "Sign up and build your student profile with your achievements", icon: "person_add" },
              { num: 2, title: "Browse Scholarships", desc: "Explore thousands of verified opportunities", icon: "search" },
              { num: 3, title: "Apply & Win", desc: "Apply directly and secure your funding", icon: "workspace_premium" },
            ].map((step) => (
              <div key={step.num} className="relative text-center group">
                <div className="absolute inset-0 bg-gradient-to-br from-info to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300"></div>
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 border-info/20 hover:border-info/50 transition-all duration-300">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-info to-cyan-500 text-white flex items-center justify-center text-4xl font-bold mx-auto mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                    {step.num}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-bold rounded-full text-sm mb-4">
              Questions?
            </span>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Got questions? We have answers
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "Is ScholarStream really free?",
                a: "Yes, absolutely. Our platform is 100% free for students. We believe access to financial aid information should be available to everyone.",
              },
              {
                q: "How are scholarships vetted?",
                a: "Our team carefully reviews every listing to ensure it comes from a reputable source and is a legitimate opportunity for students.",
              },
              {
                q: "How do I apply for scholarships?",
                a: "ScholarStream is a directory. Find a scholarship you're interested in, and we provide a direct link to the provider's official application page.",
              },
              {
                q: "Do I need to pay for applications?",
                a: "Never. Legitimate scholarships never charge application fees. If a scholarship charges, it's likely a scam.",
              },
            ].map((item, idx) => (
              <details
                key={idx}
                className="group bg-white dark:bg-slate-800 p-6 rounded-xl cursor-pointer border-l-4 border-primary-500 hover:shadow-lg hover:border-accent-500 transition-all duration-300 shadow-sm"
              >
                <summary className="flex justify-between items-center font-semibold text-slate-800 dark:text-slate-100 text-lg">
                  {item.q}
                  <span className="transform transition-transform duration-300 group-open:rotate-180 text-primary-500 text-2xl">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gradient-primary to-indigo-600 dark:from-primary-700 dark:to-indigo-700 text-white border-b-4 border-accent-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-96 h-96 bg-accent-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6 leading-tight">Ready to Find Your Scholarship?</h2>
          <p className="text-lg mb-10 max-w-2xl mx-auto opacity-95 leading-relaxed">
            Join thousands of students who have found their path to education through ScholarStream. Your opportunity is waiting!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/scholarships"
              className="bg-white text-primary-600 font-bold py-4 px-10 rounded-lg hover:bg-accent-50 transition-all duration-300 hover:shadow-lg transform hover:scale-105 shadow-lg"
            >
              Start Exploring
            </Link>
            <Link
              to="/register"
              className="border-2 border-white text-white font-bold py-4 px-10 rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}