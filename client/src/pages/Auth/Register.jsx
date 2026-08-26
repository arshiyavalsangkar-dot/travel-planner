import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaPlaneDeparture,
} from "react-icons/fa";

import bgImage from "../../assets/images/mountain.jpg";
import "../Login.css";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

     if (res.data.success) {
  localStorage.setItem("token", res.data.token);

  navigate("/dashboard");
} else {
        alert(res.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `linear-gradient(
          rgba(20,15,50,.30),
          rgba(15,10,35,.45)
        ), url(${bgImage})`,
      }}
    >
      <div className="overlay"></div>

      <div className="login-card">
        {/* Logo */}
        <div className="logo-box">
          <FaPlaneDeparture className="plane-icon" />
        </div>

        {/* Title */}
        <h1>Travel Planner</h1>

        <p className="subtitle">
          Create your account and start planning your journey.
        </p>

        <form onSubmit={handleRegister}>
          {/* ================= FULL NAME ================= */}
          <div className="input-box">
            <FaUser className="input-icon" />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>

          {/* ================= EMAIL ================= */}
          <div className="input-box">
            <FaEnvelope className="input-icon" />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          {/* ================= PASSWORD ================= */}
          <div className="input-box">
            <FaLock className="input-icon" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              minLength={6}
              required
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword((prev) => !prev)}
              role="button"
              tabIndex={0}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* ================= CONFIRM PASSWORD ================= */}
          <div className="input-box">
            <FaLock className="input-icon" />

            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              minLength={6}
              required
            />

            <span
              className="eye-icon"
              onClick={() =>
                setShowConfirmPassword((prev) => !prev)
              }
              role="button"
              tabIndex={0}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* ================= CREATE ACCOUNT ================= */}
          <button
            className="login-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* ================= LOGIN LINK ================= */}
        <p className="signup-text">
          Already have an account?{" "}
          <Link to="/login" className="signup-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;