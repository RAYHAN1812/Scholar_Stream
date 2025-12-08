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
      await login(email, password);
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error) {
      setErr(error?.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary-50 via-blue-50 to-indigo-100 dark:from-primary-950 dark:via-slate-900 dark:to-primary-900 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 -left-10 w-80 h-80 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-10 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <main className="w-full max-w-sm relative z-10">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 border border-primary-100 dark:border-primary-700">
          <div className="text-center mb-10">
            <Link className="inline-flex items-center justify-center gap-2 mb-6" to="/">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-600 to-indigo-600 flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 15.5v-5l-4 4L5 15l6-6-6-6 1.5-1.5 4 4v-5h3v5l4-4L19 9l-6 6 6 6-1.5 1.5-4-4v5h-3z" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
                ScholarStream
              </span>
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-8 font-medium">
            Log in to find your next opportunity
          </p>

          {err && (
            <div className="text-error bg-error/10 border border-error/30 p-4 rounded-lg mb-6 font-semibold text-sm">
              {err}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </span>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                  </svg>
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 font-medium"
                />
              </div>
            </div>

            {/* Remember & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                <span className="text-slate-600 dark:text-slate-400 font-medium">Remember me</span>
              </label>
              <a href="#" className="text-primary-600 hover:text-primary-700 font-semibold">
                Forgot Password?
              </a>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Log In
            </button>
          </form>

          {/* OR divider */}
          <div className="relative my-8 flex items-center">
            <div className="flex-grow border-t-2 border-slate-300 dark:border-slate-600"></div>
            <span className="flex-shrink mx-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
              OR
            </span>
            <div className="flex-grow border-t-2 border-slate-300 dark:border-slate-600"></div>
          </div>

          {/* Google login */}
          <button
            type="button"
            className="w-full flex justify-center items-center gap-3 bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 font-bold py-3 px-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-primary-500 dark:hover:border-primary-400 active:scale-95 transition-all duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
            </svg>
            Continue with Google
          </button>

          <div className="text-center mt-8">
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary-600 hover:text-primary-700 font-bold underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
