 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const { register } = useAuth(); // Your backend register function
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    photoFile: null, // File input
  });
  const [err, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Password validation
  const validatePassword = (pw) => {
    if (pw.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(pw)) return "Password must contain at least one uppercase letter";
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(pw))
      return "Password must contain a special character";
    return null;
  };

  // Convert file to base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // Remove prefix
      reader.onerror = (error) => reject(error);
    });

  // Upload to ImgBB
  const uploadPhoto = async (file) => {
    const base64Image = await toBase64(file);
    const formData = new FormData();
    formData.append("image", base64Image);
    formData.append("key", import.meta.env.VITE_IMGBB_API_KEY);

    const res = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!data.success) throw new Error("Image upload failed");
    return data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    const pErr = validatePassword(payload.password);
    if (pErr) return setErr(pErr);

    try {
      let photoURL = "";
      if (payload.photoFile) {
        photoURL = await uploadPhoto(payload.photoFile);
      }

      // Call backend register
      const res = await register({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        photoURL,
      });

      if (res.success) {
        navigate("/", { replace: true });
      } else {
        setErr(res.message);
      }
    } catch (error) {
      setErr(error.message || "Registration failed");
    }
  };

  const passwordChecks = [
    { id: "length", label: "Minimum 6 characters", valid: payload.password.length >= 6 },
    { id: "uppercase", label: "At least one capital letter", valid: /[A-Z]/.test(payload.password) },
    { id: "special", label: "At least one special character", valid: /[!@#$%^&*(),.?\":{}|<>]/.test(payload.password) },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background-light dark:bg-background-dark font-display">
      <div className="w-full max-w-md bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">
            Create your Account
          </h1>
        </div>

        {err && <div className="text-error bg-error/10 p-2 rounded mb-4">{err}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-1">
              Name
            </label>
            <input
              type="text"
              required
              placeholder="John Doe"
              value={payload.name}
              onChange={(e) => setPayload({ ...payload, name: e.target.value })}
              className="w-full pl-3 py-2.5 border border-border-light dark:border-border-dark rounded-md bg-transparent text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-primary transition-all duration-300"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-1">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={payload.email}
              onChange={(e) => setPayload({ ...payload, email: e.target.value })}
              className="w-full pl-3 py-2.5 border border-border-light dark:border-border-dark rounded-md bg-transparent text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-primary transition-all duration-300"
            />
          </div>

          {/* Photo */}
          <div>
            <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-1">
              Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPayload({ ...payload, photoFile: e.target.files[0] })}
              className="w-full"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                value={payload.password}
                onChange={(e) => setPayload({ ...payload, password: e.target.value })}
                className="w-full pl-3 py-2.5 border border-border-light dark:border-border-dark rounded-md bg-transparent text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-primary transition-all duration-300"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light-secondary dark:text-text-dark-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Password Validation */}
          <div className="space-y-1.5 text-sm">
            {passwordChecks.map((check) => (
              <div key={check.id} className={`${check.valid ? "text-success" : "text-error"}`}>
                {check.label}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:opacity-90 transition-all duration-300 transform active:scale-95"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
