import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Password validation (Keep as is)
  const validatePassword = (pw) => {
    if (pw.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(pw))
      return "Password must contain at least one uppercase letter";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pw))
      return "Password must contain a special character";
    return null;
  };

  // 🔥 FIXED: Updated handleSubmit to correctly parse and display 409 error message
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    const pErr = validatePassword(payload.password);
    if (pErr) return setErr(pErr);
    
    try {
      await register(payload);
      navigate("/", { replace: true }); 
    } catch (error) {
      const serverError = error?.response;
      
      if (serverError) {
          // Pulls the message sent by the server (e.g., "User already exists" for 409)
          setErr(serverError.data?.message || `Error ${serverError.status}: Registration failed.`);
      } else {
          // Handle network errors
          setErr("Network error: Could not connect to the server.");
      }
    }
  };

  // Password validation indicators (Keep as is)
  const passwordChecks = [
    {
      id: "length",
      label: "Minimum 6 characters",
      valid: payload.password.length >= 6,
    },
    {
      id: "uppercase",
      label: "At least one capital letter",
      valid: /[A-Z]/.test(payload.password),
    },
    {
      id: "special",
      label: "At least one special character",
      valid: /[!@#$%^&*(),.?":{}|<>]/.test(payload.password),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background-light dark:bg-background-dark font-display">
      <div className="w-full max-w-md bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg p-6 sm:p-8">
        <div className="text-center mb-8">
          <a className="inline-flex items-center gap-2 mb-4" href="#">
            <svg
              className="h-8 w-8 text-teal"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
            <span className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">
              ScholarStream
            </span>
          </a>
          <h1 className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">
            Create your Account
          </h1>
          <p className="text-text-light-secondary dark:text-text-dark-secondary mt-2">
            Join us and find your perfect scholarship.
          </p>
        </div>

        {err && (
          // The 409 message "User already exists" will be displayed here
          <div className="text-error bg-error/10 p-2 rounded mb-4">{err}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-1">
              Name
            </label>
            <div className="relative">
              <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-text-light-secondary dark:text-text-dark-secondary">
                person
              </span>
              <input
                type="text"
                required
                placeholder="John Doe"
                value={payload.name}
                onChange={(e) =>
                  setPayload((p) => ({ ...p, name: e.target.value }))
                }
                className="w-full pl-10 pr-4 py-2.5 border border-border-light dark:border-border-dark rounded-md bg-transparent text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-1">
              Email
            </label>
            <div className="relative">
              <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-text-light-secondary dark:text-text-dark-secondary">
                email
              </span>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={payload.email}
                onChange={(e) =>
                  setPayload((p) => ({ ...p, email: e.target.value }))
                }
                className="w-full pl-10 pr-4 py-2.5 border border-border-light dark:border-border-dark rounded-md bg-transparent text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
              />
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-1">
              Photo URL
            </label>
            <div className="relative">
              <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-text-light-secondary dark:text-text-dark-secondary">
                link
              </span>
              <input
                type="url"
                placeholder="https://your-photo-url.com"
                value={payload.photoURL}
                onChange={(e) =>
                  setPayload((p) => ({ ...p, photoURL: e.target.value }))
                }
                className="w-full pl-10 pr-4 py-2.5 border border-border-light dark:border-border-dark rounded-md bg-transparent text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-1">
              Password
            </label>
            <div className="relative">
              <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-text-light-secondary dark:text-text-dark-secondary">
                lock
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                value={payload.password}
                onChange={(e) =>
                  setPayload((p) => ({ ...p, password: e.target.value }))
                }
                className="w-full pl-10 pr-10 py-2.5 border border-border-light dark:border-border-dark rounded-md bg-transparent text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light-secondary dark:text-text-dark-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-icons text-xl">
                  {showPassword ? "visibility" : "visibility_off"}
                </span>
              </button>
            </div>
          </div>

          {/* Password Validation */}
          <div className="space-y-1.5 text-sm">
            {passwordChecks.map((check) => (
              <div
                key={check.id}
                className={`validation-item ${
                  check.valid ? "text-success" : "text-error"
                }`}
              >
                <span className="material-icons mr-2">
                  {check.valid ? "check_circle" : "cancel"}
                </span>
                <span>{check.label}</span>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-background-dark transition-all duration-300 transform active:scale-95"
          >
            Register
          </button>

          <p className="text-center text-sm text-text-light-secondary dark:text-text-dark-secondary">
            Already have an account?{" "}
            <a
              className="font-medium text-primary hover:underline"
              href="/login"
            >
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}