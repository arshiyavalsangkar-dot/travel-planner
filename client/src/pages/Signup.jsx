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
import bgImage from "../assets/images/mountain.jpg";
import "./Login.css";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleSignup = async (e) => {
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

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        }
      );

      if (res.data.success) {
        alert("Account created successfully!");
        navigate("/login");
      } else {
        alert(res.data.message || "Signup failed");
      }
    } catch (error) {
      console.error("SIGNUP ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Unable to create account. Please try again."
      );
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `linear-gradient(rgba(20,15,50,.30), rgba(15,10,35,.45)), url(${bgImage})`,
      }}
    >
      <div className="overlay"></div>

      <div className="login-card">
        <div className="logo-box">
          <FaPlaneDeparture className="plane-icon" />
        </div>

        <h1>Travel Planner</h1>

        <p className="subtitle">
          Create your account and start planning your journey.
        </p>

        <form onSubmit={handleSignup}>
          {/* Name */}
          <div className="input-box">
            <FaUser className="input-icon" />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="input-box">
            <FaEnvelope className="input-icon" />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="input-box">
            <FaLock className="input-icon" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="input-box">
            <FaLock className="input-icon" />

            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />

            <span
              className="eye-icon"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button className="login-btn" type="submit">
            Create Account
          </button>
        </form>

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

export default Signup;