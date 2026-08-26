import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaPlaneDeparture,
  FaArrowLeft,
} from "react-icons/fa";
import bgImage from "../assets/images/mountain.jpg";
import "./Login.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        {
          email: email.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        setMessage(res.data.message);

        // Temporary development flow:
        // Backend returns resetToken until email service is connected.
        if (res.data.resetToken) {
          sessionStorage.setItem(
            "resetToken",
            res.data.resetToken
          );
        }

        setTimeout(() => {
          navigate("/reset-password");
        }, 1200);
      }
    } catch (err) {
      console.error("FORGOT PASSWORD ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Unable to process your request"
      );
    } finally {
      setLoading(false);
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

        <h1>Forgot Password?</h1>

        <p className="subtitle">
          Enter your registered email to reset your password.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <FaEnvelope className="input-icon" />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {message && (
            <p
              style={{
                color: "#22c55e",
                textAlign: "center",
                marginBottom: "15px",
              }}
            >
              {message}
            </p>
          )}

          {error && (
            <p
              style={{
                color: "#ef4444",
                textAlign: "center",
                marginBottom: "15px",
              }}
            >
              {error}
            </p>
          )}

          <button
            className="login-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Continue"}
          </button>
        </form>

        <p className="signup-text">
          <Link to="/login" className="signup-link">
            <FaArrowLeft /> Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;