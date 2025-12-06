import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await login(email, password);
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {
      setErr(error?.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-background-light dark:bg-background-dark font-display">
      <main className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link className="inline-flex items-center gap-2" to="/">
            <svg
              className="h-8 w-8 text-teal"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 15.5v-5l-4 4L5 15l6-6-6-6 1.5-1.5 4 4v-5h3v5l4-4L19 9l-6 6 6 6-1.5 1.5-4-4v5h-3z" />
            </svg>
            <span className="text-2xl font-bold text-text-light dark:text-text-dark">
              ScholarStream
            </span>
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-center text-text-light dark:text-text-dark mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Log in to find your next opportunity.
        </p>

        {err && <div className="text-error bg-error/10 p-2 rounded mb-4">{err}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="material-icons-outlined text-gray-400">email</span>
              </span>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-DEFAULT text-text-light dark:text-text-dark placeholder-gray-400 dark:placeholder-gray-500 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="material-icons-outlined text-gray-400">lock</span>
              </span>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-DEFAULT text-text-light dark:text-text-dark placeholder-gray-400 dark:placeholder-gray-500 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-DEFAULT hover:opacity-90 active:scale-95 transition-all duration-150"
          >
            Log In
          </button>
        </form>

        {/* OR divider */}
        <div className="relative my-8 flex items-center">
          <div className="flex-grow border-t border-border-light dark:border-border-dark"></div>
          <span className="flex-shrink mx-4 text-sm text-gray-500 dark:text-gray-400">OR</span>
          <div className="flex-grow border-t border-border-light dark:border-border-dark"></div>
        </div>

        {/* Google login */}
        <button
          type="button"
          className="w-full flex justify-center items-center gap-3 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark font-medium py-3 px-4 rounded-DEFAULT hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-all duration-150"
        >
          <img
            alt="Google logo"
            className="w-6 h-6"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPj4a9PFFEFXqSR4_wub8kvEuCHlvqPfGo86ooH-cOqs38RySHCtFA37C-zApzIXIPfD5rzPXFm565M8V4h0u26ZJgpHuSNEwmHYGfXamS7Jbk9tgy0OlFp3zn-N0Otj8ZrryHi9bNiA8gq4OEJOrlJNlgss7He7c5YXogk409TTeVLNhedRmKuhxBZpmCGkVo7HBE-aVhFv4q8iyMGvErFM5_qpxXa1fTdapXFppBpetVS28a8T6RBfoQqC74P9EvQd3EngNglnAj"
          />
          Continue with Google
        </button>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
