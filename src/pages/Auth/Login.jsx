import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const result = await login({ email, password });

      if (result.success) {
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      } else {
        setErr(result.message);
      }
    } catch (error) {
      setErr(error?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary-50 via-blue-50 to-indigo-100 dark:from-primary-950 dark:via-slate-900 dark:to-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 -left-10 w-80 h-80 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-10 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <main className="w-full max-w-sm relative z-10">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 border border-primary-100 dark:border-primary-700 text-textPrimary dark:text-white">

          {/* Logo */}
          <div className="text-center mb-10">
            <Link className="inline-flex items-center justify-center gap-2 mb-6" to="/">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-600 to-indigo-600 flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 15.5v-5l-4 4L5 15l6-6-6-6 1.5-1.5 4 4v-5h3v5l4-4L19 9l-6 6 6 6-1.5 1.5-4-4v5h-3z" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
                ScholarStream
              </span>
            </Link>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-center mb-8 font-medium text-inherit">
            Log in to find your next opportunity
          </p>

          {/* Error message */}
          {err && (
            <div className="text-error bg-error/10 border border-error/30 p-4 rounded-lg mb-6 font-semibold text-sm">
              {err}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-bold mb-2 text-inherit">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // **CORRECTION HERE** Added text-gray-900 and placeholder-gray-500
                className="w-full pl-3 py-2.5 border border-border-light dark:border-border-dark rounded-md bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary transition-all duration-300"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold mb-2 text-inherit">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // **CORRECTION HERE** Added text-gray-900 and placeholder-gray-500
                className="w-full pl-3 py-2.5 border border-border-light dark:border-border-dark rounded-md bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary transition-all duration-300"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Log In
            </button>
          </form>

          {/* Register link */}
          <p className="text-center mt-6 text-sm text-inherit">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary-600 hover:text-primary-700 font-bold underline">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}